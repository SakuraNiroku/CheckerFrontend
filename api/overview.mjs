import { MODE_METADATA } from './mode-metadata.mjs';

export class OverviewError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'OverviewError';
    this.code = code;
  }
}

function cleanText(value, maxLength = 200) {
  return typeof value === 'string' ? value.replace(/§[0-9a-fk-or]/gi, '').trim().slice(0, maxLength) : '';
}

function validDate(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null;
}

function onlineCount(value) {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function apiBaseUrl(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  try {
    if (!/^https?:\/\//i.test(text) || text.includes('?') || text.includes('#')) throw new Error();
    const url = new URL(text);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error();
    return url.href.replace(/\/+$/, '');
  } catch {
    throw new OverviewError('CONFIGURATION_ERROR', '数据接口地址配置有误，请检查 API_URL 是否为完整的 HTTP 或 HTTPS 地址。');
  }
}

async function fetchJson(url, fetchImpl, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      method: 'GET',
      signal: controller.signal,
      headers: { accept: 'application/json' },
      redirect: 'error',
    });
    if (!response.ok) {
      console.error('[api/overview] upstream returned non-2xx', {
        endpoint: new URL(url).pathname,
        status: response.status,
        contentType: response.headers.get('content-type'),
      });
      return null;
    }
    try {
      return await response.json();
    } catch (error) {
      console.error('[api/overview] upstream returned invalid JSON', {
        endpoint: new URL(url).pathname,
        status: response.status,
        contentType: response.headers.get('content-type'),
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  } catch (error) {
    console.error('[api/overview] upstream request failed', {
      endpoint: new URL(url).pathname,
      error: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
    });
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function getOverview({
  apiUrl,
  serverName = '',
  pollIntervalMinutes = 5,
  fetchImpl = fetch,
  timeoutMs = 5000,
} = {}) {
  const baseUrl = apiBaseUrl(apiUrl);
  const timeout = Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 5000;
  const [onlineResponse, statusResponse] = await Promise.all([
    fetchJson(`${baseUrl}/online`, fetchImpl, timeout),
    fetchJson(`${baseUrl}/status`, fetchImpl, timeout),
  ]);

  if (onlineResponse?.code !== 0 || !Array.isArray(onlineResponse.data)) {
    throw new OverviewError('UPSTREAM_UNAVAILABLE', '暂时无法获取在线人数，请稍后重试或联系管理员检查数据接口。');
  }

  const statusData = statusResponse?.code === 0 && statusResponse.data
    && typeof statusResponse.data === 'object' && !Array.isArray(statusResponse.data)
    ? statusResponse.data : null;
  const modes = onlineResponse.data.slice(0, 256).flatMap(item => {
    const name = cleanText(item?.name);
    if (!name) return [];
    const metadata = Object.hasOwn(MODE_METADATA, name) ? MODE_METADATA[name] : null;
    return [{
      id: cleanText(metadata?.id) || name,
      name,
      online: onlineCount(item.online),
      description: Array.isArray(metadata?.description)
        ? metadata.description.slice(0, 20).map(line => cleanText(line, 400)).filter(Boolean) : [],
    }];
  });

  const hasError = Boolean(statusData?.lastError || statusData?.nodeLastError
    || (statusData?.nodeExitCode != null && statusData.nodeExitCode !== 0));
  const collectorRunning = statusData
    ? statusData.nodeStarted === true && statusData.interceptorStarted === true && statusData.nodeExitCode == null
    : null;
  const message = hasError ? '已连接数据接口，采集服务有异常记录'
    : collectorRunning === false ? '数据接口已连接，采集服务暂未运行'
      : collectorRunning === null ? '已获取在线人数，暂时无法确认采集状态'
        : '采集服务运行中';
  const pollInterval = Number(pollIntervalMinutes);

  return {
    source: 'live',
    checkedAt: validDate(onlineResponse.checkedAt),
    fetchedAt: new Date().toISOString(),
    server: { name: cleanText(serverName) || cleanText(statusData?.server?.name) || '布吉岛' },
    status: { apiReachable: true, collectorRunning, hasError, message },
    summary: {
      totalOnline: modes.reduce((total, mode) => total + (mode.online ?? 0), 0),
      modeCount: modes.length,
    },
    modes,
    pollIntervalMinutes: Number.isFinite(pollInterval) && pollInterval >= 1 && pollInterval <= 1440 ? pollInterval : 5,
  };
}
