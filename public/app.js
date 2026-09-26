const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  list: '<path d="M9 5h12M9 12h12M9 19h12"/><path d="M3 5h1M3 12h1M3 19h1"/>',
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-9h6v9"/>',
  cube: '<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M7.5 5.5l9 5"/>',
  chevrons: '<path d="m9 9 3-3 3 3m-6 6 3 3 3-3"/>',
  gamepad:
    '<path d="M7 7h10a4 4 0 0 1 4 3l1 7a2 2 0 0 1-3.4 1.7L16 16H8l-2.6 2.7A2 2 0 0 1 2 17l1-7a4 4 0 0 1 4-3Z"/><path d="M6 11v4m-2-2h4m7-2h.01m3 3h.01"/>',
  star: '<path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
  activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3h.01"/>',
  settings:
    '<path d="m9 3-.7 2.4-2 .9-2.3-.5-2 3.4 1.7 1.9v2L2 15l2 3.4 2.3-.5 2 .9L9 21h4l.7-2.2 2-.9 2.3.5 2-3.4-1.7-1.9v-2L20 9.2l-2-3.4-2.3.5-2-.9L13 3z"/><circle cx="11" cy="12" r="3"/>',
  sparkles:
    '<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3zM20 2v4m-2-2h4"/>',
  "arrow-up-right": '<path d="M7 17 17 7M7 7h10v10"/>',
  "arrow-right": '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  refresh:
    '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 6a8 8 0 0 1 13.3 4M4.6 14A8 8 0 0 0 18 18"/>',
  users:
    '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v2"/>',
  flame:
    '<path d="M12 3c1 5-2 6-2 9-2-1-2-3-2-3s-4 4-4 7a8 8 0 0 0 16 0c0-5-5-10-8-13Z"/><path d="M10 20a4 4 0 0 1 2-7c0 3 3 3 2 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  server:
    '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6m-6 11h6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  sort: '<path d="M8 4v16m-4-4 4 4 4-4M15 5h6m-6 5h4m-4 5h2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
  leaf: '<path d="M20 3C8 3 3 7 3 13a7 7 0 0 0 7 7c6 0 10-5 10-17ZM3 21l11-11"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  bed: '<path d="M3 6v15m18-9v9M3 17h18M3 10h5a2 2 0 0 1 2 2v5m0-5h8a3 3 0 0 1 3 3v2M5 8h2"/>',
  swords:
    '<path d="m14 4 6-1-1 6-9 9-4-4zM4 14l6 6M3 21l4-4M4 3l6 1 3 3m3 6 3 3m-5 4 6-6m-3 3 4 4"/>',
  island: '<path d="m3 15 9-4 9 4-9 7zM12 11V3m-4 4 4-4 4 4m-8 3 4-4 4 4"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM12 7v9m-4-5h8"/>',
  blocks:
    '<path d="m3 15 5-3 5 3v5l-5 3-5-3zM3 15l5 3 5-3m-5 3v5M11 5l5-3 5 3v5l-5 3-5-3zM11 5l5 3 5-3m-5 3v5"/>',
  potion:
    '<path d="M9 3h6m-5 0v5l-5 8a4 4 0 0 0 3 5h8a4 4 0 0 0 3-5l-5-8V3M7 14h10m-6 3h.01m3 1h.01"/>',
  target:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  flower:
    '<path d="M12 14v8m0-5c-4-3-6-1-6-1m6 3c4-4 6-2 6-2"/><path d="M12 4c-4-5-8 0-5 3-5 1-3 6 1 6 1 5 6 5 7 0 5 0 6-5 2-6 2-4-2-7-5-3Z"/><circle cx="12" cy="9" r="2"/>',
  bowl: '<path d="M3 12h18a9 9 0 0 1-18 0ZM6 21h12M8 8V4m4 4V2m4 6V4"/>',
};

function icon(name, className = "") {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.cube}</svg>`;
}
document.querySelectorAll("[data-icon]").forEach((node) => {
  node.innerHTML = icon(node.dataset.icon);
});

const $ = (selector) => document.querySelector(selector);
const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const number = (value) =>
  Number.isFinite(value) ? new Intl.NumberFormat("zh-CN").format(value) : "—";
const time = (value) =>
  value && Number.isFinite(Date.parse(value))
    ? new Date(value).toLocaleTimeString("zh-CN", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "—";
const dateTime = (value) =>
  value && Number.isFinite(Date.parse(value))
    ? new Date(value).toLocaleString("zh-CN", { hour12: false })
    : "暂无采集时间";
const readSaved = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};
const savedFavorites = readSaved("heypixel-favorites", []);
const savedSettings = readSaved("heypixel-settings", {});
const state = {
  data: null,
  networkError: false,
  apiErrorCode: null,
  loading: false,
  view: "overview",
  filter: "all",
  search: "",
  sort: "popular",
  layout: readSaved("heypixel-layout", "grid") === "list" ? "list" : "grid",
  favorites: new Set(
    Array.isArray(savedFavorites)
      ? savedFavorites.filter((item) => typeof item === "string")
      : [],
  ),
  interval: 120,
  autoRefresh: savedSettings?.autoRefresh !== false,
};
const colors = [
  "#4c8568",
  "#83a792",
  "#b1c8b8",
  "#d5bb85",
  "#a6b6c7",
  "#e4eae5",
];
let refreshTimer;
let toastTimer;

function category(mode) {
  const type = mode.description?.[0] || "";
  if (/休闲|娱乐/.test(type))
    return { key: "casual", label: type.split("[")[0].trim() };
  if (/合作|训练|技巧/.test(type))
    return { key: "other", label: type.split("[")[0].trim() };
  if (/竞技/.test(type))
    return { key: "competitive", label: type.split("[")[0].trim() };
  return {
    key: "other",
    label: type.includes("[") ? type.split("[")[0].trim() : "特色玩法",
  };
}

function appearance(mode) {
  const id = mode.id;
  if (/bed$/.test(id)) return { icon: "bed", bg: "#fcf0ec", color: "#d99883" };
  if (/sword|bow/.test(id))
    return { icon: "swords", bg: "#f0effa", color: "#a396c1" };
  if (/potion/.test(id))
    return { icon: "potion", bg: "#f2eff9", color: "#ab91c1" };
  if (/ender_eye|sapling/.test(id))
    return { icon: "island", bg: "#edf5ed", color: "#8bb08a" };
  if (/scaffolding/.test(id))
    return { icon: "blocks", bg: "#fcf4e7", color: "#c7b07c" };
  if (/villager/.test(id))
    return { icon: "shield", bg: "#f6f1e8", color: "#b9a278" };
  if (/campfire/.test(id))
    return { icon: "flame", bg: "#fff2e9", color: "#d3a277" };
  if (/petal/.test(id))
    return { icon: "flower", bg: "#fbf0f4", color: "#cd9eaf" };
  if (/stew|potato|apple/.test(id))
    return { icon: "bowl", bg: "#f9f3e8", color: "#bba06c" };
  if (/lantern/.test(id))
    return { icon: "blocks", bg: "#edf5f6", color: "#92b8b9" };
  if (/anchor/.test(id))
    return { icon: "target", bg: "#f1edf7", color: "#ab96b6" };
  return { icon: "cube", bg: "#eff4f2", color: "#92ada0" };
}

function gameIcon(mode) {
  const look = appearance(mode);
  return `<span class="game-icon" style="--icon-bg:${look.bg};--icon-color:${look.color}">${icon(look.icon)}</span>`;
}

function sortedModes() {
  return [...(state.data?.modes || [])].sort(
    (a, b) =>
      (b.online ?? -1) - (a.online ?? -1) ||
      a.name.localeCompare(b.name, "zh-CN"),
  );
}

function visibleModes() {
  const query = state.search.trim().toLocaleLowerCase();
  const modes = (state.data?.modes || []).filter(
    (mode) =>
      (state.view !== "favorites" || state.favorites.has(mode.id)) &&
      (state.filter === "all" || category(mode).key === state.filter) &&
      (!query ||
        mode.name.toLocaleLowerCase().includes(query) ||
        mode.id.toLocaleLowerCase().includes(query)),
  );
  return modes.sort((a, b) => {
    if (state.sort === "name") return a.name.localeCompare(b.name, "zh-CN");
    if (a.online === null) return b.online === null ? 0 : 1;
    if (b.online === null) return -1;
    return (
      (state.sort === "ascending"
        ? a.online - b.online
        : b.online - a.online) || a.name.localeCompare(b.name, "zh-CN")
    );
  });
}

function freshness() {
  const checked = Date.parse(state.data?.checkedAt);
  if (!Number.isFinite(checked)) return { stale: true, text: "暂无采集时间" };
  const age = Math.max(0, Date.now() - checked);
  const minutes = Math.floor(age / 60000);
  return {
    stale:
      age > Math.max((state.data?.pollIntervalMinutes || 5) * 2, 10) * 60000,
    text:
      minutes < 1
        ? "刚刚采集"
        : minutes < 60
          ? `${minutes} 分钟前采集`
          : minutes < 1440
            ? `${Math.floor(minutes / 60)} 小时前采集`
            : `${Math.floor(minutes / 1440)} 天前采集`,
  };
}

function sourceLabel() {
  if (!state.data) return "暂无数据";
  return state.networkError ? "本页保留数据" : "采集服务接口";
}

function health() {
  const data = state.data;
  if (state.apiErrorCode === "CONFIGURATION_ERROR")
    return {
      label: "等待配置",
      className: "warning",
      text: "数据接口尚未正确配置，请联系看板管理员。",
    };
  if (state.networkError)
    return {
      label: "连接中断",
      className: "warning",
      text: data
        ? "暂时无法连接采集接口，已保留本页上次获取的数据。连接恢复后会自动更新。"
        : "暂时无法连接采集接口，请稍后刷新，或联系看板管理员检查服务。",
    };
  if (!data)
    return { label: "连接中", className: "muted", text: "正在检查采集服务…" };
  if (!data.modes.length)
    return {
      label: "等待结果",
      className: "warning",
      text: "已连接采集程序，但本轮没有返回玩法。请等待下一轮采集；如果持续为空，可检查运行状态。",
    };
  if (freshness().stale)
    return {
      label: "数据待更新",
      className: "warning",
      text: "已连接数据接口，但采集结果已有一段时间未更新。请检查采集程序。",
    };
  if (data.status?.hasError)
    return {
      label: "有异常记录",
      className: "warning",
      text: "人数接口可用，采集程序有异常记录。可在运行状态中查看处理说明。",
    };
  if (data.status?.collectorRunning === false)
    return {
      label: "请检查采集",
      className: "warning",
      text:
        data.status?.message ||
        "人数接口可用，暂时无法确认采集程序是否正常运行。",
    };
  if (data.status?.collectorRunning == null)
    return {
      label: "接口正常",
      className: "",
      text: "在线人数已更新，后端未提供采集程序的运行状态。",
    };
  return {
    label: "运行中",
    className: "",
    text: "采集程序正在运行，新的采集结果会自动显示在这里。",
  };
}

function renderOverview() {
  const data = state.data;
  const modes = sortedModes();
  const total = data?.summary.totalOnline ?? 0;
  const hasData = data && data.source !== "unavailable";
  const known = modes.filter((mode) => mode.online !== null);
  const top = known[0];
  $("#server-name").textContent = data?.server.name || "尚未连接服务器";
  $("#total-online").innerHTML =
    `${hasData && known.length ? number(total) : "—"}<span>人</span>`;
  $("#mode-count").innerHTML =
    `${hasData ? number(modes.length) : "—"}<span>个</span>`;
  $("#nav-mode-count").textContent = hasData ? modes.length : "—";
  $("#mode-foot").textContent = hasData
    ? `已获取 ${known.length} 个玩法的人数`
    : "等待首次采集";
  $("#popular-mode").textContent = top?.name || "暂无数据";
  $("#popular-foot").innerHTML = top
    ? `${icon("users")}<strong>${number(top.online)} 人</strong><span>正在这个玩法中</span>`
    : "等待玩法数据";
  $("#popular-foot svg")?.setAttribute("style", "width:11px;height:11px");
  $("#checked-time").textContent = time(data?.checkedAt);
  $("#checked-foot").textContent = freshness().text;
  $("#checked-time").title = dateTime(data?.checkedAt);
  $("#stats").setAttribute("aria-busy", "false");
  $("#data-source").textContent = sourceLabel();
  $("#scan-interval").textContent = `约 ${data?.pollIntervalMinutes || 5} 分钟`;
  $("#refresh-interval").textContent = state.autoRefresh
    ? "每 2 分钟"
    : "已暂停";
  const status = health();
  $("#connection-badge").textContent = status.label;
  $("#connection-badge").className = `status-badge ${status.className}`;
  $("#connection-note").textContent = status.text;
  $("#footer-update").textContent = data
    ? `${sourceLabel()} · 数据采集于 ${dateTime(data.checkedAt)}`
    : "暂时无法获取数据";
  const showNotice =
    state.networkError ||
    (data &&
      (data.source !== "live" || !data.modes.length || freshness().stale));
  $("#notice").hidden = !showNotice;
  if (showNotice) {
    $("#notice").className = `notice${state.networkError ? " error" : ""}`;
    $("#notice").innerHTML =
      `${icon("info")}<span>${escape(status.text)}${data?.checkedAt ? ` 上次采集：${escape(dateTime(data.checkedAt))}。` : ""}</span>`;
  }
  $("#export-button").disabled = !modes.length;
  renderDistribution();
  renderModes();
  renderStatus();
}

function renderDistribution() {
  const modes = sortedModes().filter((mode) => mode.online !== null);
  const total = state.data?.summary.totalOnline || 0;
  const segments = modes
    .slice(0, 5)
    .map((mode) => ({ name: mode.name, online: mode.online }));
  const other = modes.slice(5).reduce((sum, mode) => sum + mode.online, 0);
  if (other > 0) segments.push({ name: "其他玩法", online: other });
  let cursor = 0;
  const stops = segments.map((segment, index) => {
    const start = cursor;
    cursor += total > 0 ? (segment.online / total) * 100 : 0;
    return `${colors[index]} ${start}% ${cursor}%`;
  });
  $("#distribution-chart").style.background =
    total > 0 ? `conic-gradient(from -90deg, ${stops.join(",")})` : "#edf2ee";
  $("#distribution-chart").setAttribute(
    "aria-label",
    total > 0
      ? segments
          .map(
            (segment) =>
              `${segment.name} ${number(segment.online)} 人，占 ${((segment.online / total) * 100).toFixed(1)}%`,
          )
          .join("；")
      : "暂时没有可展示的人数分布",
  );
  $("#donut-total").textContent =
    state.data?.source !== "unavailable" && modes.length ? number(total) : "—";
  $("#distribution-legend").innerHTML = segments.length
    ? segments
        .map(
          (segment, index) =>
            `<div class="legend-row"><span class="legend-dot" style="background:${colors[index]}"></span><span class="legend-name">${escape(segment.name)}</span><span class="legend-count">${number(segment.online)}</span><span class="legend-percent">${total ? ((segment.online / total) * 100).toFixed(1) : "0.0"}%</span></div>`,
        )
        .join("")
    : '<p class="muted-small">首次采集后显示人数分布</p>';
}

function renderModes() {
  const modes = visibleModes();
  const total = state.data?.summary.totalOnline || 0;
  const max = Math.max(1, ...sortedModes().map((mode) => mode.online || 0));
  const grid = $("#mode-grid");
  const focused = grid.contains(document.activeElement)
    ? {
        action: document.activeElement.dataset.action,
        id: document.activeElement.dataset.id,
      }
    : null;
  grid.classList.toggle("list-layout", state.layout === "list");
  $("#grid-view").classList.toggle("selected", state.layout === "grid");
  $("#list-view").classList.toggle("selected", state.layout === "list");
  $("#grid-view").setAttribute("aria-pressed", String(state.layout === "grid"));
  $("#list-view").setAttribute("aria-pressed", String(state.layout === "list"));
  $("#result-count").textContent = modes.length;
  $("#visible-count").textContent =
    `显示 ${modes.length} / ${state.data?.modes.length || 0} 个玩法`;
  $(".favorite-dot").hidden = state.favorites.size === 0;
  grid.setAttribute("aria-busy", String(state.loading && !state.data));
  if (!state.data && state.loading) {
    grid.innerHTML =
      '<div class="loading-state"><span class="loader"></span><p>正在连接你的方块世界…</p></div>';
    return;
  }
  if (!modes.length) {
    const noData =
      !state.data ||
      state.data.source === "unavailable" ||
      !state.data.modes.length;
    const noFavorites =
      state.view === "favorites" &&
      !state.data?.modes.some((mode) => state.favorites.has(mode.id));
    const awaitingScan =
      state.data?.source === "live" && !state.data.modes.length;
    const emptyMessage = awaitingScan
      ? "接口已经连接，本轮暂未获取到游戏玩法。<br />下一次采集成功后，这里会自动更新。"
      : "暂时无法读取游戏玩法，请稍后刷新。<br />你也可以在「运行状态」中查看连接说明。";
    grid.innerHTML = `<div class="empty-state">${icon(noData ? "server" : noFavorites ? "star" : "search")}<h3>${noData ? (awaitingScan ? "等待下一轮采集" : "还没有采集到玩法") : noFavorites ? "把喜欢的玩法留在这里" : "没有找到这个玩法"}</h3><p>${noData ? emptyMessage : noFavorites ? "点击玩法右上角的星星，就能在这里快速找到它。" : "试试其他关键词，或者切换到全部类型。"}</p>${noData ? '<a class="button button-secondary" href="#status">查看运行状态</a>' : noFavorites ? '<a class="button button-secondary" href="#modes">去发现玩法</a>' : '<button class="button button-secondary" data-action="clear">清除搜索与筛选</button>'}</div>`;
    return;
  }
  grid.innerHTML = modes
    .map((mode) => {
      const starred = state.favorites.has(mode.id);
      const kind = category(mode);
      const platform = (mode.description?.[0] || "").includes("跨平台")
        ? "PC / PE"
        : /\[PC\]/.test(mode.description?.[0] || "")
          ? "PC"
          : "";
      return `<article class="mode-card"><button class="favorite-button${starred ? " favorited" : ""}" data-action="favorite" data-id="${escape(mode.id)}" aria-pressed="${starred}" aria-label="${starred ? "取消关注" : "关注"}${escape(mode.name)}" title="${starred ? "取消关注" : "关注玩法"}">${icon("star")}</button><button class="mode-card-main" data-action="detail" data-id="${escape(mode.id)}" aria-label="查看${escape(mode.name)}详情，${mode.online === null ? "人数未知" : `${mode.online} 人在线`}"><div class="mode-card-top">${gameIcon(mode)}<div class="mode-card-meta"><h3 title="${escape(mode.name)}">${escape(mode.name)}</h3><p class="mode-card-category">${escape(kind.label)}${platform ? ` · ${platform}` : ""}</p></div></div><div class="mode-card-bottom"><span class="mode-online">${number(mode.online)}<small>${mode.online === null ? "人数未知" : "人"}</small></span><span class="mode-share" title="占所有已知玩法总人数的比例">${mode.online !== null && total ? ((mode.online / total) * 100).toFixed(1) + "%" : "—"}</span></div><div class="mode-progress" aria-hidden="true"><span style="width:${((mode.online || 0) / max) * 100}%"></span></div></button></article>`;
    })
    .join("");
  if (focused)
    [...grid.querySelectorAll("button[data-action]")]
      .find(
        (button) =>
          button.dataset.action === focused.action &&
          button.dataset.id === focused.id,
      )
      ?.focus({ preventScroll: true });
}

function renderStatus() {
  const data = state.data;
  const status = health();
  const apiUp = data?.status.apiReachable && !state.networkError;
  const running = data?.status.collectorRunning === true && !state.networkError;
  const statusAvailable =
    data?.status.collectorRunning != null && !state.networkError;
  const fresh =
    data?.modes.length > 0 && !freshness().stale && !state.networkError;
  const badge = (label, good, neutral = false) =>
    `<span class="status-badge${neutral ? " muted" : good ? "" : " warning"}">${label}</span>`;
  $("#status-page").innerHTML =
    `<h2 id="status-title">从服务器到看板，发生了什么？</h2><p>${escape(status.text)}</p><div class="status-steps"><article class="status-step"><div class="status-step-icon">${icon("server")}</div><h3>01 · 连接数据接口 ${badge(apiUp ? "已连接" : "未连接", apiUp)}</h3><p>${apiUp ? "看板可以读取服务器提供的在线人数。" : "暂时无法连接采集接口，可以稍后刷新或联系管理员。"}</p></article><article class="status-step"><div class="status-step-icon">${icon("activity")}</div><h3>02 · 采集玩法人数 ${badge(running ? "已启动" : statusAvailable ? "待检查" : "未提供", running, !statusAvailable)}</h3><p>${running ? `采集程序已启动，通常每 ${data?.pollIntervalMinutes || 5} 分钟读取一次玩法人数。` : statusAvailable ? "采集程序暂未运行，请联系服务器管理员检查。" : "后端未提供运行状态；在线人数仍可通过人数接口正常更新。"}${data?.status.hasError ? " 程序曾记录异常，可由管理员检查最新日志。" : ""}</p></article><article class="status-step"><div class="status-step-icon">${icon("grid")}</div><h3>03 · 更新到看板 ${badge(fresh ? "数据较新" : "等待更新", fresh)}</h3><p>最近采集：${escape(dateTime(data?.checkedAt))}。${state.autoRefresh ? `页面每 2 分钟读取一次结果。` : "页面自动刷新已暂停。"}</p></article></div><div class="status-help"><h3>如果人数一直没有变化</h3><p>「刷新数据」会重新读取最近的采集结果；新的人数需要等待服务器完成下一轮扫描。如果长时间没有更新，请联系管理员检查采集服务。</p><p>看板与采集程序分别运行，打开或关闭此页面都不会启动、停止游戏采集。</p></div><div class="status-help"><h3>数据是怎么算的？</h3><p>总人数为接口中各玩法的已知人数之和，不代表去重后的玩家数。未知人数显示为「—」。连接中断时，本页会保留上一次获取的结果并标明时间；重新打开页面后需再次连接接口。</p></div>`;
}

function changeView() {
  const next = location.hash.slice(1);
  const views = {
    overview: ["服务器概览", "此刻的热闹，一眼就知道。", "总览"],
    modes: ["发现游戏玩法", "每一种玩法，都有不一样的精彩。", "全部玩法"],
    favorites: ["我的关注", "喜欢的玩法，放在离你更近的地方。", "我的关注"],
    status: ["运行状态", "数据从哪里来，现在是否正常。", "运行状态"],
  };
  state.view = Object.hasOwn(views, next) ? next : "overview";
  const [title, subtitle, breadcrumb] = views[state.view];
  $("#page-title").innerHTML = `${title}<span class="heading-dot">.</span>`;
  $("#page-subtitle").textContent = subtitle;
  $("#breadcrumb-label").textContent = breadcrumb;
  document.title = `${breadcrumb} · Heypixel 在线看板`;
  document.querySelectorAll("[data-view]").forEach((link) => {
    const active = link.dataset.view === state.view;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  $("#welcome-banner").hidden = state.view !== "overview";
  $("#stats").hidden = state.view !== "overview";
  $("#dashboard-grid").hidden = state.view === "status";
  $("#status-page").hidden = state.view !== "status";
  $("#export-button").hidden = state.view === "status";
  $("#modes-title").textContent =
    state.view === "favorites" ? "关注的玩法" : "游戏玩法";
  state.filter = "all";
  state.search = "";
  $("#search-input").value = "";
  updateFilters();
  renderModes();
  renderStatus();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateFilters() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const selected = button.dataset.filter === state.filter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function notify(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").hidden = false;
  toastTimer = setTimeout(() => {
    $("#toast").hidden = true;
  }, 3200);
}

async function refresh(manual = false) {
  if (state.loading) return;
  state.loading = true;
  if (!state.data) renderModes();
  $("#refresh-button").disabled = true;
  $("#refresh-button").classList.add("spinning");
  $("#refresh-button span:last-child").textContent = "刷新中";
  try {
    const response = await fetch("/api/overview", {
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error("Unable to load overview");
      error.code = data?.code;
      throw error;
    }
    if (
      !Array.isArray(data?.modes) ||
      !data.summary ||
      !data.status ||
      !data.server
    )
      throw new Error("Invalid data");
    const previousCheckedAt = state.data?.checkedAt;
    state.data = data;
    state.networkError = false;
    state.apiErrorCode = null;
    if (manual)
      notify(
        !data.modes.length
          ? "本轮暂未获取到玩法，等待下一轮采集"
          : previousCheckedAt === data.checkedAt
            ? "已刷新，当前已是最近一次采集结果"
            : "已获取最新采集结果",
      );
  } catch (error) {
    state.networkError = true;
    state.apiErrorCode =
      error.code === "CONFIGURATION_ERROR" ? error.code : null;
    if (manual) notify(health().text);
  } finally {
    state.loading = false;
    $("#refresh-button").disabled = false;
    $("#refresh-button").classList.remove("spinning");
    $("#refresh-button span:last-child").textContent = "刷新数据";
    renderOverview();
    scheduleRefresh();
  }
}

function scheduleRefresh() {
  clearTimeout(refreshTimer);
  if (state.autoRefresh && !document.hidden)
    refreshTimer = setTimeout(() => refresh(), state.interval * 1000);
}

function openDialog(title, content, footer = "") {
  $("#dialog-content").innerHTML =
    `<div class="dialog-header"><h2 id="dialog-title">${escape(title)}</h2><button class="icon-button" data-dialog-close aria-label="关闭弹窗">${icon("close")}</button></div><div class="dialog-body">${content}</div>${footer ? `<div class="dialog-footer">${footer}</div>` : ""}`;
  $("#app-dialog").setAttribute("aria-labelledby", "dialog-title");
  $("#app-dialog").showModal();
}

function showHelp() {
  openDialog(
    "很简单，这样使用看板",
    `<h3>看看哪里最热闹</h3><p>「总览」展示各玩法人数合计、热门玩法和人气分布。默认按在线人数排序，点进玩法可以阅读介绍。</p><h3>找到喜欢的玩法</h3><p>输入玩法名称搜索，或者选择游戏类型。点击卡片右上角的星星，就能在「我的关注」中找到它。关注保存在当前浏览器。</p><h3>刷新与采集有什么区别？</h3><p>页面默认每 2 分钟读取数据，采集程序约每 ${state.data?.pollIntervalMinutes || 5} 分钟收集一次人数。「刷新数据」只会读取最近结果，不会让采集程序立即扫描。</p><h3>导出与连接中断</h3><p>「导出数据」会下载当前搜索与筛选结果，包含人数、采集时间和来源。连接中断时，本页会保留上次成功获取的数据，并明确提示；这些数据不代表当前实时人数。</p>`,
    '<button class="button button-primary" data-dialog-close>明白了</button>',
  );
}

function showSettings() {
  openDialog(
    "按你的节奏，查看数据",
    `<div class="setting-row"><label for="auto-refresh-setting">自动刷新<small>每 2 分钟读取最近一次采集结果</small></label><input id="auto-refresh-setting" type="checkbox" ${state.autoRefresh ? "checked" : ""} /></div><h3>仅在这台浏览器中生效</h3><p>你的关注、显示方式和刷新偏好会自动保存在当前浏览器中。</p>`,
    '<button class="button button-secondary" data-dialog-close>取消</button><button class="button button-primary" id="save-settings">保存设置</button>',
  );
}

function showDetail(id) {
  const mode = state.data?.modes.find((item) => item.id === id);
  if (!mode) return;
  const starred = state.favorites.has(mode.id);
  const description = mode.description.filter(
    (line) => !/左键|右键|点击|位玩家|玩家在线|组服务器/.test(line),
  );
  openDialog(
    "玩法详情",
    `<div class="detail-title">${gameIcon(mode)}<h3>${escape(mode.name)}</h3></div><div class="detail-total">${number(mode.online)}<span>${mode.online === null ? "暂未获取人数" : "人在线"}</span></div><p>${state.networkError ? "连接中断 · 本页保留数据" : "来自最近一次采集"} · ${escape(freshness().text)}</p><div class="detail-tags"><span>${escape(category(mode).label)}</span>${mode.description[0]?.includes("跨平台") ? "<span>电脑 / 手机均可游玩</span>" : /\[PC\]/.test(mode.description[0] || "") ? "<span>电脑端玩法</span>" : ""}</div><div class="detail-description">${
      description.slice(1).length
        ? description
            .slice(1)
            .map((line) => `<p>${escape(line)}</p>`)
            .join("")
        : "<p>这个玩法暂时没有更多介绍，人数会随采集结果更新。</p>"
    }</div><p class="detail-timestamp">采集时间：${escape(dateTime(state.data.checkedAt))}</p>`,
    `<button class="button button-secondary" data-dialog-close>关闭</button><button class="button button-primary" data-detail-favorite="${escape(mode.id)}">${icon("star")}${starred ? "取消关注" : "关注这个玩法"}</button>`,
  );
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  const persisted = save("heypixel-favorites", [...state.favorites]);
  renderModes();
  notify(
    persisted
      ? state.favorites.has(id)
        ? "已加入我的关注"
        : "已取消关注"
      : "已更新关注；浏览器禁止保存，关闭页面后将不保留",
  );
}

function exportCsv() {
  const modes = visibleModes();
  if (!modes.length) {
    notify("当前没有可导出的玩法，请调整搜索或筛选");
    return;
  }
  const cell = (value) => {
    let text = String(value ?? "");
    if (/^[\s]*[=+@-]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  };
  const rows = [
    ["玩法名称", "在线人数", "游戏类型", "采集时间", "数据来源"],
    ...modes.map((mode) => [
      mode.name,
      mode.online ?? "",
      category(mode).label,
      dateTime(state.data.checkedAt),
      sourceLabel(),
    ]),
  ];
  const blob = new Blob(
    ["\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n")],
    { type: "text/csv;charset=utf-8" },
  );
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `Heypixel-在线人数-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify(`已导出当前列表的 ${modes.length} 个玩法`);
}

$("#refresh-button").addEventListener("click", () => refresh(true));
$("#export-button").addEventListener("click", exportCsv);
$("#help-button").addEventListener("click", showHelp);
$("#top-help-button").addEventListener("click", showHelp);
$("#settings-button").addEventListener("click", showSettings);
$("#top-settings-button").addEventListener("click", showSettings);
$(".skip-link").addEventListener("click", (event) => {
  event.preventDefault();
  $("#main-content").focus();
  $("#main-content").scrollIntoView();
});
$("#search-input").addEventListener("input", (event) => {
  state.search = event.target.value;
  renderModes();
});
$("#sort-select").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderModes();
});
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    updateFilters();
    renderModes();
  }),
);
for (const layout of ["grid", "list"])
  $(`#${layout}-view`).addEventListener("click", () => {
    state.layout = layout;
    save("heypixel-layout", layout);
    renderModes();
  });
$("#mode-grid").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "favorite") toggleFavorite(button.dataset.id);
  if (button.dataset.action === "detail") showDetail(button.dataset.id);
  if (button.dataset.action === "clear") {
    state.search = "";
    state.filter = "all";
    $("#search-input").value = "";
    updateFilters();
    renderModes();
    $("#search-input").focus();
  }
});
$("#app-dialog").addEventListener("click", (event) => {
  if (event.target.closest("[data-dialog-close]")) $("#app-dialog").close();
  if (event.target.id === "save-settings") {
    state.autoRefresh = $("#auto-refresh-setting").checked;
    const persisted = save("heypixel-settings", {
      autoRefresh: state.autoRefresh,
    });
    scheduleRefresh();
    renderOverview();
    $("#app-dialog").close();
    notify(
      persisted
        ? "设置已保存"
        : "设置已生效；浏览器禁止保存，关闭页面后将不保留",
    );
  }
  const favoriteButton = event.target.closest("[data-detail-favorite]");
  if (favoriteButton) {
    const id = favoriteButton.dataset.detailFavorite;
    toggleFavorite(id);
    favoriteButton.innerHTML = `${icon("star")}${state.favorites.has(id) ? "取消关注" : "关注这个玩法"}`;
  }
  if (event.target === $("#app-dialog")) {
    const bounds = $("#app-dialog").getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      $("#app-dialog").close();
  }
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !["INPUT", "SELECT", "TEXTAREA"].includes(
      document.activeElement?.tagName,
    ) &&
    !$("#app-dialog").open &&
    state.view !== "status"
  ) {
    event.preventDefault();
    $("#search-input").focus();
  }
});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && state.autoRefresh) refresh();
  else clearTimeout(refreshTimer);
});
window.addEventListener("hashchange", changeView);
setInterval(() => {
  if (state.data && !document.hidden) renderOverview();
}, 60000);
changeView();
refresh();
