import {appearance} from "./appearance";
import {showMessage} from "../dialog/message";
import {fetchPost} from "../util/fetch";
import {confirmDialog} from "../dialog/confirmDialog";
import {highlightRender} from "../protyle/render/highlightRender";
import {exportLayout, saveLayout} from "../layout/util";
import {Constants} from "../constants";
/// #if !BROWSER
import * as path from "path";
/// #endif
import {getFrontend, isBrowser} from "../util/functions";
import {setStorageVal} from "../protyle/util/compatibility";
import {hasClosestByAttribute, hasClosestByClassName} from "../protyle/util/hasClosest";
import {Plugin} from "../plugin";
import {App} from "../index";
import {escapeAttr} from "../util/escape";
import {uninstall} from "../plugin/uninstall";
import {afterLoadPlugin, loadPlugin, loadPlugins, reloadPlugin} from "../plugin/loader";
import {loadAssets} from "../util/assets";
import {addScript} from "../protyle/util/addScript";
import {useShell} from "../util/pathName";

export const bazaar = {
    element: undefined as Element,
    genHTML() {
        if (!window.siyuan.config.bazaar.trust) {
            return `<div class="fn__flex-column">
<div class="fn__flex-1"></div>
<div class="b3-label">
    <div>${window.siyuan.languages.bazaarTrust}</div>
    <div class="fn__hr--b"></div>
    <div>${window.siyuan.languages.bazaarTrust3}</div>
</div>
<div class="fn__flex b3-label">
    <svg class="b3-label__icon"><use xlink:href="#iconEye"></use></svg>
    <div>
        ${window.siyuan.languages.bazaarTrustCodeReview}
        <div class="b3-label__text">${window.siyuan.languages.bazaarTrustCodeReviewTip}</div>
    </div>
</div>
<div class="fn__flex b3-label">
    <svg class="b3-label__icon"><use xlink:href="#iconGithub"></use></svg>
    <div>
        ${window.siyuan.languages.bazaarTrustOpenSource}
        <div class="b3-label__text">${window.siyuan.languages.bazaarTrustOpenSourceTip}</div>
    </div>
</div>
<div class="fn__flex b3-label">
    <svg class="b3-label__icon"><use xlink:href="#iconUsers"></use></svg>
    <div>
        ${window.siyuan.languages.bazaarCommunityReview}
        <div class="b3-label__text">${window.siyuan.languages.bazaarPeerReviewTip}</div>
    </div>
</div>
<div class="fn__flex b3-label">
    <svg class="b3-label__icon"><use xlink:href="#iconInfo"></use></svg>
    <div>
        ${window.siyuan.languages.bazaarUserReport}
        <div class="b3-label__text">${window.siyuan.languages.bazaarUserReportTip}</div>
    </div>
</div>
<div class="b3-label b3-label--noborder">
    <div>${window.siyuan.languages.bazaarTrust1}</div>
    <div class="fn__hr--b"></div>
    <diiv>${window.siyuan.languages.bazaarTrust2}</diiv>
</div>
<div class="ft__center b3-label b3-label--noborder">
    <button class="b3-button fn__size200">${window.siyuan.languages.trust}</button>
</div>
<div class="fn__flex-1"></div>
</div>`;
        }
        const localSort = window.siyuan.storage[Constants.LOCAL_BAZAAR];
        const loadingHTML = `<div style="height: ${bazaar.element.clientHeight - 80}px;display: flex;align-items: center;justify-content: center;"><img src="/stage/loading-pure.svg"></div>`;
        return `<div class="fn__flex-column" style="height: 100%">
<div class="layout-tab-bar fn__flex">
    <div data-type="downloaded" class="item item--full item--focus"><span class="fn__flex-1"></span><span class="item__text">${window.siyuan.languages.downloaded}</span><span class="fn__flex-1"></span></div>
    <div data-type="plugin" class="item item--full"><span class="fn__flex-1"></span><span class="item__text">${window.siyuan.languages.plugin}</span><span class="fn__flex-1"></span></div>
    <div data-type="theme" class="item item--full"><span class="fn__flex-1"></span><span class="item__text">${window.siyuan.languages.theme}</span><span class="fn__flex-1"></span></div>
    <div data-type="icon" class="item item--full"><span class="fn__flex-1"></span><span class="item__text">${window.siyuan.languages.icon}</span><span class="fn__flex-1"></span></div>
    <div data-type="template" class="item item--full"><span class="fn__flex-1"></span><span class="item__text">${window.siyuan.languages.template}</span><span class="fn__flex-1"></span></div>
    <div data-type="widget" class="item item--full"><span class="fn__flex-1"></span><span class="item__text">${window.siyuan.languages.widget}</span><span class="fn__flex-1"></span></div>
</div>
<div class="fn__flex-1">
    <div class="config-bazaar__panel" data-type="downloaded" data-init="true">
        <div data-type="downloaded-update"></div>
        <div class="fn__flex config-bazaar__title">
            <button data-type="myPlugin" class="b3-button">${window.siyuan.languages.plugin}</button>
            <div class="fn__space"></div>
            <button data-type="myTheme" class="b3-button b3-button--outline">${window.siyuan.languages.theme}</button>
            <div class="fn__space"></div>
            <button data-type="myIcon" class="b3-button b3-button--outline">${window.siyuan.languages.icon}</button>
            <div class="fn__space"></div>
            <button data-type="myTemplate" class="b3-button b3-button--outline">${window.siyuan.languages.template}</button>
            <div class="fn__space"></div>
            <button data-type="myWidget" class="b3-button b3-button--outline">${window.siyuan.languages.widget}</button>
            <div class="fn__space"></div>
            <div class="b3-form__icon">
                <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
                <input class="b3-text-field b3-form__icon-input fn__block" placeholder="${window.siyuan.languages.enterKey} ${window.siyuan.languages.search}">
            </div>
            <div class="fn__space"></div>
            <div class="fn__flex-1"></div>
            <input ${window.siyuan.config.bazaar.petalDisabled ? "" : " checked"} data-type="plugins-enable" type="checkbox" class="b3-switch fn__flex-center" style="margin-right: 8px">
            <div class="counter counter--bg fn__none fn__flex-center b3-tooltips b3-tooltips__w" aria-label="${window.siyuan.languages.total}"></div>
        </div>
        <div id="configBazaarDownloaded" class="config-bazaar__content">
            ${loadingHTML}
        </div>
    </div>
    <div data-type="theme" class="config-bazaar__panel fn__none">
        <div class="fn__flex config-bazaar__title">
            <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconSort"></use></svg>
            <div class="fn__space"></div>
            <select class="b3-select">
                <option ${localSort.theme === "0" ? "selected" : ""} value="0">${window.siyuan.languages.sortByUpdateTimeDesc}</option>
                <option ${localSort.theme === "1" ? "selected" : ""} value="1">${window.siyuan.languages.sortByUpdateTimeAsc}</option>
                <option ${localSort.theme === "2" ? "selected" : ""} value="2">${window.siyuan.languages.sortByDownloadsDesc}</option>
                <option ${localSort.theme === "3" ? "selected" : ""} value="3">${window.siyuan.languages.sortByDownloadsAsc}</option>
            </select>
            <div class="fn__space"></div>
            <select id="bazaarSelect" class="b3-select">
                <option selected value="2">${window.siyuan.languages.all}</option>
                <option value="0">${window.siyuan.languages.themeLight}</option>
                <option value="1">${window.siyuan.languages.themeDark}</option>
            </select>
            <div class="fn__space"></div>
            <div class="b3-form__icon">
                <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
                <input class="b3-text-field b3-form__icon-input fn__block" placeholder="${window.siyuan.languages.enterKey} ${window.siyuan.languages.search}">
            </div>
            <div class="fn__space"></div>
            <div class="fn__flex-1"></div>
            <div class="counter counter--bg fn__flex-center b3-tooltips b3-tooltips__w" aria-label="${window.siyuan.languages.total}"></div>
        </div>
        <div id="configBazaarTheme" class="config-bazaar__content">
            ${loadingHTML}
        </div>
    </div>
    <div class="fn__none config-bazaar__panel" data-type="template">
        <div class="fn__flex config-bazaar__title">
            <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconSort"></use></svg>
            <div class="fn__space"></div>
            <select class="b3-select">
                <option ${localSort.template === "0" ? "selected" : ""} value="0">${window.siyuan.languages.sortByUpdateTimeDesc}</option>
                <option ${localSort.template === "1" ? "selected" : ""} value="1">${window.siyuan.languages.sortByUpdateTimeAsc}</option>
                <option ${localSort.template === "2" ? "selected" : ""} value="2">${window.siyuan.languages.sortByDownloadsDesc}</option>
                <option ${localSort.template === "3" ? "selected" : ""} value="3">${window.siyuan.languages.sortByDownloadsAsc}</option>
            </select>
            <div class="fn__space"></div>
            <div class="b3-form__icon">
                <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
                <input class="b3-text-field b3-form__icon-input fn__block" placeholder="${window.siyuan.languages.enterKey} ${window.siyuan.languages.search}">
            </div>
            <div class="fn__space"></div>
            <div class="fn__flex-1"></div>
            <div class="counter counter--bg fn__flex-center b3-tooltips b3-tooltips__w" aria-label="${window.siyuan.languages.total}"></div>
        </div>
        <div id="configBazaarTemplate" class="config-bazaar__content">
            ${loadingHTML}
        </div>
    </div>
    <div class="fn__none config-bazaar__panel" data-type="plugin">
        <div class="fn__flex config-bazaar__title">
            <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconSort"></use></svg>
            <div class="fn__space"></div>
            <select class="b3-select">
                <option ${localSort.plugin === "0" ? "selected" : ""} value="0">${window.siyuan.languages.sortByUpdateTimeDesc}</option>
                <option ${localSort.plugin === "1" ? "selected" : ""} value="1">${window.siyuan.languages.sortByUpdateTimeAsc}</option>
                <option ${localSort.plugin === "2" ? "selected" : ""} value="2">${window.siyuan.languages.sortByDownloadsDesc}</option>
                <option ${localSort.plugin === "3" ? "selected" : ""} value="3">${window.siyuan.languages.sortByDownloadsAsc}</option>
            </select>
            <div class="fn__space"></div>
            <div class="b3-form__icon">
                <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
                <input class="b3-text-field b3-form__icon-input fn__block" placeholder="${window.siyuan.languages.enterKey} ${window.siyuan.languages.search}">
            </div>
            <div class="fn__space"></div>
            <div class="fn__flex-1"></div>
            <div class="counter counter--bg fn__flex-center b3-tooltips b3-tooltips__w" aria-label="${window.siyuan.languages.total}"></div>
        </div>
        <div id="configBazaarPlugin" class="config-bazaar__content">
            ${loadingHTML}
        </div>
    </div>
    <div class="fn__none config-bazaar__panel" data-type="icon">
        <div class="fn__flex config-bazaar__title">
            <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconSort"></use></svg>
            <div class="fn__space"></div>
            <select class="b3-select">
                <option ${localSort.icon === "0" ? "selected" : ""} value="0">${window.siyuan.languages.sortByUpdateTimeDesc}</option>
                <option ${localSort.icon === "1" ? "selected" : ""} value="1">${window.siyuan.languages.sortByUpdateTimeAsc}</option>
                <option ${localSort.icon === "2" ? "selected" : ""} value="2">${window.siyuan.languages.sortByDownloadsDesc}</option>
                <option ${localSort.icon === "3" ? "selected" : ""} value="3">${window.siyuan.languages.sortByDownloadsAsc}</option>
            </select>
            <div class="fn__space"></div>
            <div class="b3-form__icon">
                <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
                <input class="b3-text-field b3-form__icon-input fn__block" placeholder="${window.siyuan.languages.enterKey} ${window.siyuan.languages.search}">
            </div>
            <div class="fn__space"></div>
            <div class="fn__flex-1"></div>
            <div class="counter counter--bg fn__flex-center b3-tooltips b3-tooltips__w" aria-label="${window.siyuan.languages.total}"></div>
        </div>
        <div id="configBazaarIcon" class="config-bazaar__content">
            ${loadingHTML}
        </div>
    </div>
    <div class="fn__none config-bazaar__panel" data-type="widget">
        <div class="fn__flex config-bazaar__title">
            <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconSort"></use></svg>
            <div class="fn__space"></div>
            <select class="b3-select">
                <option ${localSort.widget === "0" ? "selected" : ""} value="0">${window.siyuan.languages.sortByUpdateTimeDesc}</option>
                <option ${localSort.widget === "1" ? "selected" : ""} value="1">${window.siyuan.languages.sortByUpdateTimeAsc}</option>
                <option ${localSort.widget === "2" ? "selected" : ""} value="2">${window.siyuan.languages.sortByDownloadsDesc}</option>
                <option ${localSort.widget === "3" ? "selected" : ""} value="3">${window.siyuan.languages.sortByDownloadsAsc}</option>
            </select>
            <div class="fn__space"></div>
            <div class="b3-form__icon">
                <svg class="b3-form__icon-icon"><use xlink:href="#iconSearch"></use></svg>
                <input class="b3-text-field b3-form__icon-input fn__block" placeholder="${window.siyuan.languages.enterKey} ${window.siyuan.languages.search}">
            </div>
            <div class="fn__space"></div>
            <div class="fn__flex-1"></div>
            <div class="counter counter--bg fn__flex-center b3-tooltips b3-tooltips__w" aria-label="${window.siyuan.languages.total}"></div>
        </div>
        <div id="configBazaarWidget" class="config-bazaar__content">
            ${loadingHTML}
        </div>
    </div>
</div>
<div id="configBazaarReadme" class="config-bazaar__readme"></div>
</div>`;
    },
    _genCardHTML(item: IBazaarItem, bazaarType: TBazaarType) {
        let hide = false;
        let themeMode = "";
        if (bazaarType === "themes") {
            const themeValue = (bazaar.element.querySelector("#bazaarSelect") as HTMLSelectElement).value;
            if ((themeValue === "0" && item.modes.includes("dark")) ||
                themeValue === "1" && item.modes.includes("light")) {
                hide = true;
            }
            themeMode = item.modes.toString();
        }
        let showSwitch = false;
        if (["icons", "themes"].includes(bazaarType)) {
            showSwitch = true;
        }
        const dataObj = {
            bazaarType,
            themeMode: themeMode,
            updated: item.updated,
            name: item.name,
            repoURL: item.repoURL,
            repoHash: item.repoHash,
            downloads: item.downloads,
            downloaded: false,
        };
        return `<div data-obj='${JSON.stringify(dataObj)}' class="b3-card b3-card--wrap${hide ? " fn__none" : ""}${item.current ? " b3-card--current" : ""}">
    <div class="b3-card__img">
        <img src="${item.iconURL}" onerror="this.src='/stage/images/icon.png'"/>
    </div>
    <div class="fn__flex-1 fn__flex-column">
        <div class="b3-card__info fn__flex-1">
            ${item.preferredName} <span class="ft__on-surface ft__smaller">${item.name}</span>
            <div class="b3-card__desc" title="${escapeAttr(item.preferredDesc) || ""}">
                ${item.preferredDesc || ""}
            </div>
        </div>
        <div class="b3-card__actions">
            <span class="block__icon block__icon--show ft__primary">
                <svg><use xlink:href="#iconDownload"></use></svg>
                <span class="fn__space"></span>
                ${item.downloads}
            </span>
            <span class="fn__space"></span>
            ${item.preferredFunding ? `<a target="_blank" href="${item.preferredFunding}" class="block__icon block__icon--show ariaLabel" aria-label="${window.siyuan.languages.sponsor} ${item.preferredFunding}"><svg class="ft__pink"><use xlink:href="#iconHeart"></use></svg></a><span class="fn__space"></span>` : ""}
            <div class="fn__flex-1"></div>
            <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${item.installed ? "" : " fn__none"}" data-type="uninstall" aria-label="${window.siyuan.languages.uninstall}">
                <svg><use xlink:href="#iconTrashcan"></use></svg>
            </span>
            <div class="fn__space${!item.current && item.installed && showSwitch ? "" : " fn__none"}"></div>
            <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${!item.current && item.installed && showSwitch ? "" : " fn__none"}" data-type="switch" aria-label="${window.siyuan.languages.use}">
                <svg><use xlink:href="#iconSelect"></use></svg>
            </span>
            <div class="fn__space${item.outdated ? "" : " fn__none"}"></div>
            <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${item.outdated ? "" : " fn__none"}" aria-label="${window.siyuan.languages.update}">
                <svg class="ft__primary"><use xlink:href="#iconRefresh"></use></svg>
            </span>
        </div>
    </div>
</div>`;
    },
    _genUpdateItemHTML(item: IBazaarItem, bazaarType: TBazaarType) {
        const dataObj = {
            bazaarType,
            themeMode: item.modes?.toString(),
            updated: item.updated,
            name: item.name,
            repoURL: item.repoURL,
            repoHash: item.repoHash,
            downloaded: true
        };
        return `<div class="b3-card" data-obj='${JSON.stringify(dataObj)}'>
    <div class="b3-card__img"><img src="${item.iconURL}" onerror="this.src='/stage/images/icon.png'"/></div>
    <div class="fn__flex-1 fn__flex-column">
        <div class="b3-card__info b3-card__info--left fn__flex-1">
            ${item.preferredName} <span class="ft__on-surface ft__smaller">${item.name}</span>
            <div class="b3-card__desc" title="${escapeAttr(item.preferredDesc) || ""}">${item.preferredDesc || ""}</div>
        </div>
    </div>
    <div class="b3-card__actions b3-card__actions--right">
        ${item.incompatible ? `<span class="fn__space"></span><span class="fn__flex-center b3-tooltips b3-tooltips__nw b3-chip b3-chip--error b3-chip--small" aria-label="${window.siyuan.languages.incompatiblePluginTip}">${window.siyuan.languages.incompatible}</span>` : ""}
        ${item.preferredFunding ? `<a target="_blank" href="${item.preferredFunding}" class="block__icon block__icon--show ariaLabel" aria-label="${window.siyuan.languages.sponsor} ${item.preferredFunding}"><svg class="ft__pink"><use xlink:href="#iconHeart"></use></svg></a>` : ""}
        <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${isBrowser() ? " fn__none" : ""}" data-type="open" aria-label="${window.siyuan.languages.showInFolder}">
            <svg><use xlink:href="#iconFolder"></use></svg>
        </span>
        <span data-type="install-t" aria-label="${window.siyuan.languages.update}" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show">
            <svg class="ft__primary"><use xlink:href="#iconRefresh"></use></svg>
        </span>
    </div>
</div>`;
    },
    _getUpdate() {
        fetchPost("/api/bazaar/getUpdatedPackage", {frontend: getFrontend()}, (response) => {
            let html = "";
            response.data.plugins.forEach((item: IBazaarItem) => {
                html += this._genUpdateItemHTML(item, "plugins");
            });
            response.data.themes.forEach((item: IBazaarItem) => {
                html += this._genUpdateItemHTML(item, "themes");
            });
            response.data.icons.forEach((item: IBazaarItem) => {
                html += this._genUpdateItemHTML(item, "icons");
            });
            response.data.templates.forEach((item: IBazaarItem) => {
                html += this._genUpdateItemHTML(item, "templates");
            });
            response.data.widgets.forEach((item: IBazaarItem) => {
                html += this._genUpdateItemHTML(item, "widgets");
            });
            this._data.update = response.data;
            const allCount = response.data.themes.length + response.data.icons.length + response.data.widgets.length + response.data.plugins.length + response.data.templates.length;
            if (allCount === 0) {
                this.element.querySelector('[data-type="downloaded-update"]').innerHTML = "";
                return;
            }
            this.element.querySelector('[data-type="downloaded-update"]').innerHTML = `<div class="fn__flex config-bazaar__title">
    <div class="fn__flex-1"></div>
    <button class="b3-button" data-type="install-all">${window.siyuan.languages.updateAll}</button>
    <span class="fn__space"></span>
    <div class="counter counter--bg fn__flex-center">${allCount}</div>
</div>
<div class="config-bazaar__content">${html}</div>`;
        });
    },
    _genMyHTML(bazaarType: TBazaarType, app: App, updateUpdate = true) {
        if (updateUpdate) {
            this._getUpdate();
        }
        const contentElement = bazaar.element.querySelector("#configBazaarDownloaded");
        if (contentElement.getAttribute("data-loading") === "true" ||
            contentElement.previousElementSibling.querySelector(`[data-type="my${bazaarType.replace(bazaarType[0], bazaarType[0].toUpperCase()).substring(0, bazaarType.length - 1)}"]`).classList.contains("b3-button--outline")) {
            return;
        }
        contentElement.setAttribute("data-loading", "true");
        let url = "/api/bazaar/getInstalledTheme";
        if (bazaarType === "icons") {
            url = "/api/bazaar/getInstalledIcon";
        } else if (bazaarType === "widgets") {
            url = "/api/bazaar/getInstalledWidget";
        } else if (bazaarType === "templates") {
            url = "/api/bazaar/getInstalledTemplate";
        } else if (bazaarType === "plugins") {
            url = "/api/bazaar/getInstalledPlugin";
        }
        fetchPost(url, {
            frontend: getFrontend(),
            keyword: (contentElement.previousElementSibling.querySelector(".b3-text-field") as HTMLInputElement)?.value || "",
        }, response => {
            contentElement.removeAttribute("data-loading");
            let html = "";
            let showSwitch = false;
            if (["icons", "themes"].includes(bazaarType)) {
                showSwitch = true;
            }
            const counterElement = contentElement.previousElementSibling.querySelector(".counter");
            if (response.data.packages.length === 0) {
                counterElement.classList.add("fn__none");
            } else {
                counterElement.classList.remove("fn__none");
                counterElement.textContent = response.data.packages.length;
                response.data.packages.forEach((item: IBazaarItem) => {
                    const dataObj = {
                        bazaarType,
                        themeMode: item.modes?.toString(),
                        updated: item.updated,
                        name: item.name,
                        repoURL: item.repoURL,
                        repoHash: item.repoHash,
                        downloaded: true
                    };
                    let hasSetting = false;
                    if (bazaarType === "plugins") {
                        app.plugins.find((item: Plugin) => {
                            if (item.name === dataObj.name) {
                                // @ts-ignore
                                hasSetting = item.setting || item.__proto__.hasOwnProperty("openSetting");
                                return true;
                            }
                        });
                    }
                    html += `<div data-obj='${JSON.stringify(dataObj)}' class="b3-card${item.current ? " b3-card--current" : ""}${(window.siyuan.config.bazaar.petalDisabled && bazaarType === "plugins") ? " b3-card--disabled" : ""}">
    <div class="b3-card__img"><img src="${item.iconURL}" onerror="this.src='/stage/images/icon.png'"/></div>
    <div class="fn__flex-1 fn__flex-column">
        <div class="b3-card__info b3-card__info--left fn__flex-1">
            ${item.preferredName} <span class="ft__on-surface ft__smaller">${item.name}</span>
            <div class="b3-card__desc" title="${escapeAttr(item.preferredDesc) || ""}">${item.preferredDesc || ""}</div>
        </div>
    </div>
    <div class="b3-card__actions b3-card__actions--right">
        ${item.incompatible ? `<span class="fn__space"></span><span class="fn__flex-center b3-tooltips b3-tooltips__nw b3-chip b3-chip--error b3-chip--small" aria-label="${window.siyuan.languages.incompatiblePluginTip}">${window.siyuan.languages.incompatible}</span>` : ""}
        ${item.preferredFunding ? `<a target="_blank" href="${item.preferredFunding}" class="block__icon block__icon--show ariaLabel" aria-label="${window.siyuan.languages.sponsor} ${item.preferredFunding}"><svg class="ft__pink"><use xlink:href="#iconHeart"></use></svg></a>` : ""}
        <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${hasSetting ? "" : " fn__none"}" data-type="setting" aria-label="${window.siyuan.languages.config}">
            <svg><use xlink:href="#iconSettings"></use></svg>
        </span>
        <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show" data-type="uninstall" aria-label="${window.siyuan.languages.uninstall}">
            <svg><use xlink:href="#iconTrashcan"></use></svg>
        </span>
        <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${isBrowser() ? " fn__none" : ""}" data-type="open" aria-label="${window.siyuan.languages.showInFolder}">
            <svg><use xlink:href="#iconFolder"></use></svg>
        </span>
        <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${!item.current && showSwitch ? "" : " fn__none"}" data-type="switch" aria-label="${window.siyuan.languages.use}">
            <svg><use xlink:href="#iconSelect"></use></svg>
        </span>
        <span data-type="install-t" aria-label="${window.siyuan.languages.update}" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show${item.outdated ? "" : " fn__none"}">
            <svg class="ft__primary"><use xlink:href="#iconRefresh"></use></svg>
        </span>
        <span class="fn__space${bazaarType === "plugins" ? "" : " fn__none"}"></span>
        <span class="fn__space${bazaarType === "plugins" ? "" : " fn__none"}"></span>
        <input class="b3-switch fn__flex-center${bazaarType === "plugins" ? "" : " fn__none"}" ${item.enabled ? "checked" : ""} data-type="plugin-enable" type="checkbox" ${item.incompatible ? " disabled" : ""}>
    </div>
</div>`;
                });
            }
            bazaar._data.downloaded = response.data.packages;
            const checkElement = contentElement.parentElement.querySelector(".b3-switch");
            if (bazaarType === "plugins") {
                checkElement.classList.remove("fn__none");
            } else {
                checkElement.classList.add("fn__none");
            }
            contentElement.innerHTML = html ? html : `<div class="fn__hr"></div><ul class="b3-list b3-list--background"><li class="b3-list--empty">${window.siyuan.languages.emptyContent}</li></ul>`;
        });
    },
    _data: {
        themes: [] as IBazaarItem[],
        templates: [] as IBazaarItem[],
        icons: [] as IBazaarItem[],
        widgets: [] as IBazaarItem[],
        plugins: [] as IBazaarItem[],
        downloaded: [] as IBazaarItem[],
        update: {
            themes: [] as IBazaarItem[],
            templates: [] as IBazaarItem[],
            icons: [] as IBazaarItem[],
            widgets: [] as IBazaarItem[],
            plugins: [] as IBazaarItem[],
        }
    },
    _renderReadme(bazaarType: TBazaarType, data: IBazaarItem, downloaded: boolean) {
        const readmeElement = bazaar.element.querySelector("#configBazaarReadme") as HTMLElement;
        const urls = data.repoURL.split("/");
        urls.pop();
        let navTitle = window.siyuan.languages.icon;
        if (bazaarType === "themes") {
            navTitle = window.siyuan.languages.theme;
        } else if (bazaarType === "widgets") {
            navTitle = window.siyuan.languages.widget;
        } else if (bazaarType === "templates") {
            navTitle = window.siyuan.languages.template;
        } else if (bazaarType === "plugins") {
            navTitle = window.siyuan.languages.plugin;
        }
        const dataObj1 = {
            bazaarType,
            themeMode: data.modes?.toString(),
            name: data.name,
            repoURL: data.repoURL,
            repoHash: data.repoHash,
            downloaded
        };
        readmeElement.innerHTML = ` <div class="item__side" data-obj='${JSON.stringify(dataObj1)}'>
    <div class="fn__flex">
        <div style="padding-right: 8px" class="block__icon block__icon--show b3-tooltips b3-tooltips__e" data-type="goBack" aria-label="${window.siyuan.languages.back}">
            <svg><use xlink:href="#iconLeft"></use></svg>
            <span class="fn__space"></span>
            ${navTitle}
        </div>
    </div>
    <img class="item__img" src="${data.iconURL}" onerror="this.src='/stage/images/icon.png'">
    <div>
        <a href="${data.repoURL}" target="_blank" class="item__title" title="GitHub Repo">${data.preferredName}</a>
    </div>
    <div class="fn__hr"></div>
    <div>
        <a href="${data.repoURL}" target="_blank" class="ft__on-surface ft__smaller" title="GitHub Repo">${data.name}</a>
    </div>
    <div class="block__icons">
        <span class="fn__flex-1"></span>
        ${data.preferredFunding ?
            `<a target="_blank" href="${data.preferredFunding}" class="block__icon block__icon--show ariaLabel" aria-label="${window.siyuan.languages.sponsor} ${data.preferredFunding}"><svg class="ft__pink"><use xlink:href="#iconHeart"></use></svg></a>` :
            `<span class="b3-tooltips b3-tooltips__ne block__icon block__icon--show ft__primary" aria-label="${window.siyuan.languages.author}"><svg><use xlink:href="#iconAccount"></use></svg></span>`
        }
        <span class="fn__space"></span>
        <a href="${urls.join("/")}" target="_blank" title="Creator">${data.author}</a>
        <span class="fn__flex-1"></span>
    </div>
    <div class="fn__hr--b"></div>
    <div class="fn__hr--b"></div>
    <div class="ft__on-surface ft__smaller" style="line-height: 20px;">${window.siyuan.languages.currentVer}<br>v${data.version}</div>
    <div class="fn__hr"></div>
    <div class="ft__on-surface ft__smaller" style="line-height: 20px;">${downloaded ? window.siyuan.languages.installDate : window.siyuan.languages.releaseDate}<br>${downloaded ? data.hInstallDate : data.hUpdated}</div>
    <div class="fn__hr${downloaded ? " fn__none" : ""}"></div>
    <div class="ft__on-surface ft__smaller${downloaded ? " fn__none" : ""}" style="line-height: 20px;">${window.siyuan.languages.pkgSize}<br>${data.hSize}</div>
    <div class="fn__hr"></div>
    <div class="ft__on-surface ft__smaller" style="line-height: 20px;">${window.siyuan.languages.installSize}<br>${data.hInstallSize}</div>
    <div class="fn__hr--b"></div>
    <div class="fn__hr--b"></div>
    <div${(data.installed || downloaded) ? ' class="fn__none"' : ""}>
        <button class="b3-button" style="width: 168px"  data-type="install">${window.siyuan.languages.download}</button>
    </div>
    <div${(data.outdated && (data.installed || downloaded)) ? "" : ' class="fn__none"'}>
        <button class="b3-button" style="width: 168px" data-type="install-t">${window.siyuan.languages.update}</button>
    </div>
    <div class="fn__hr--b"></div>
    <div>
        <a href="${data.repoURL}/issues" target="_blank" title="Feedback via GitHub Issues" class="b3-button b3-button--success" style="width: 168px" data-type="feedback">${window.siyuan.languages.feedback}</a>
    </div>
    <div class="fn__hr--b${downloaded ? " fn__none" : ""}"></div>
    <div class="fn__hr--b${downloaded ? " fn__none" : ""}"></div>
    <div class="fn__flex${downloaded ? " fn__none" : ""}" style="justify-content: center;">
        <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconGithub"></use></svg>
        <span class="fn__space"></span>
        <a href="${data.repoURL}" target="_blank" title="GitHub Repo">Repo</a>
        <span class="fn__space"></span>
        <span class="fn__space"></span>
        <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconStar"></use></svg>
        <span class="fn__space"></span>
        <a href="${data.repoURL}/stargazers" target="_blank" title="Stars">${data.stars}</a>
        <span class="fn__space"></span>
        <span class="fn__space"></span>
        <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconGitHubI"></use></svg>
        <span class="fn__space"></span>
        <a href="${data.repoURL}/issues" target="_blank" title="Open issues">${data.openIssues}</a>
        <span class="fn__space"></span>
        <span class="fn__space"></span>
        <svg class="svg ft__on-surface fn__flex-center"><use xlink:href="#iconDownload"></use></svg>
        <span class="fn__space"></span>
        ${data.downloads}
    </div>
    <div class="fn__hr--b"></div>
    <div class="fn__hr--b"></div>
    <div class="fn__flex-1"></div>
</div>
<div class="item__main">
    <div class="item__preview" style="background-image: url(${data.previewURL})"></div>
    <div class="b3-typography${data.preferredDesc ? "" : " fn__none"}">
        <blockquote>
            <p>
                ${data.preferredDesc || ""}
            </p>
         </blockquote>
    </div>
    <div class="item__readme b3-typography b3-typography--default">
        <img data-type="img-loading" style="height: 64px;width: 100%;padding: 16px 0;" src="/stage/loading-pure.svg">
    </div>
</div>`;
        if (downloaded && data.preferredReadme) {
            const mdElement = readmeElement.querySelector(".item__readme");
            mdElement.innerHTML = data.preferredReadme;
            highlightRender(mdElement);
        } else {
            fetchPost("/api/bazaar/getBazaarPackageREAME", {
                repoURL: data.repoURL,
                repoHash: data.repoHash,
                packageType: bazaarType
            }, response => {
                const mdElement = readmeElement.querySelector(".item__readme");
                mdElement.innerHTML = response.data.html;
                highlightRender(mdElement);
            });
        }
        readmeElement.classList.add("config-bazaar__readme--show");
    },
    bindEvent(app: App) {
        if (!window.siyuan.config.bazaar.trust) {
            bazaar.element.querySelector("button").addEventListener("click", () => {
                fetchPost("/api/setting/setBazaar", {
                    trust: true,
                    petalDisabled: window.siyuan.config.bazaar.petalDisabled
                }, () => {
                    window.siyuan.config.bazaar.trust = true;
                    bazaar.element.innerHTML = bazaar.genHTML();
                    bazaar.bindEvent(app);
                });
            });
            return;
        }
        this._genMyHTML("plugins", app);
        bazaar.element.firstElementChild.addEventListener("click", (event) => {
            let target = event.target as HTMLElement;
            const dataElement = hasClosestByAttribute(target, "data-obj", null);
            let dataObj: IObject;
            if (dataElement) {
                dataObj = JSON.parse(dataElement.getAttribute("data-obj"));
            }
            while (target && !target.isEqualNode(bazaar.element)) {
                const type = target.getAttribute("data-type");
                if (target.tagName === "A") {
                    break;
                } else if (type === "open" && dataObj) {
                    /// #if !BROWSER
                    const dirName = dataObj.bazaarType;
                    if (dirName === "icons" || dirName === "themes") {
                        useShell("openPath", path.join(window.siyuan.config.system.confDir, "appearance", dirName, dataObj.name));
                    } else {
                        useShell("openPath", path.join(window.siyuan.config.system.dataDir, dirName, dataObj.name));
                    }
                    /// #endif
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (["myTheme", "myTemplate", "myIcon", "myWidget", "myPlugin"].includes(type)) {
                    if (target.classList.contains("b3-button--outline") &&
                        !bazaar.element.querySelector("#configBazaarDownloaded").getAttribute("data-loading")) {
                        target.parentElement.childNodes.forEach((item: HTMLElement) => {
                            if (item.nodeType !== 3 && item.classList.contains("b3-button")) {
                                item.classList.add("b3-button--outline");
                            }
                        });
                        target.classList.remove("b3-button--outline");
                        this._genMyHTML(type.replace("my", "").toLowerCase() + "s" as TBazaarType, app, false);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "goBack") {
                    bazaar.element.querySelector("#configBazaarReadme").classList.remove("config-bazaar__readme--show");
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "install") {
                    if (!target.classList.contains("b3-button--progress")) {
                        const bazaarType = dataObj.bazaarType as TBazaarType;
                        let url = "/api/bazaar/installBazaarTemplate";
                        if (bazaarType === "themes") {
                            url = "/api/bazaar/installBazaarTheme";
                        } else if (bazaarType === "icons") {
                            url = "/api/bazaar/installBazaarIcon";
                        } else if (bazaarType === "widgets") {
                            url = "/api/bazaar/installBazaarWidget";
                        } else if (bazaarType === "plugins") {
                            url = "/api/bazaar/installBazaarPlugin";
                        }
                        fetchPost(url, {
                            keyword: (bazaar.element.querySelector(".config-bazaar__panel:not(.fn__none) .b3-form__icon-input") as HTMLInputElement).value,
                            repoURL: dataObj.repoURL,
                            packageName: dataObj.name,
                            repoHash: dataObj.repoHash,
                            mode: dataObj.themeMode === "dark" ? 1 : 0,
                            frontend: getFrontend()
                        }, async response => {
                            if (window.siyuan.config.appearance.themeJS && bazaarType === "themes") {
                                if (window.destroyTheme) {
                                    try {
                                        await window.destroyTheme();
                                        window.destroyTheme = undefined;
                                        document.getElementById("themeScript").remove();
                                    } catch (e) {
                                        console.error("destroyTheme error: " + e);
                                    }
                                    window.siyuan.config.appearance = response.data.appearance;
                                    loadAssets(window.siyuan.config.appearance);
                                } else {
                                    exportLayout({
                                        cb() {
                                            window.location.reload();
                                        },
                                        errorExit: false,
                                    });
                                    return;
                                }
                            }
                            bazaar._onBazaar(response, bazaarType, ["themes", "icons"].includes(bazaarType));
                            bazaar._genMyHTML(bazaarType, app, false);
                            if (bazaarType === "plugins") {
                                if (window.siyuan.config.bazaar.petalDisabled) {
                                    confirmDialog(window.siyuan.languages.confirm, window.siyuan.languages.enablePluginTip2);
                                } else {
                                    confirmDialog("💡 " + window.siyuan.languages.enablePlugin, window.siyuan.languages.enablePluginTip, () => {
                                        fetchPost("/api/petal/setPetalEnabled", {
                                            packageName: dataObj.name,
                                            enabled: true,
                                            frontend: getFrontend()
                                        }, (response) => {
                                            loadPlugin(app, response.data);
                                            bazaar._genMyHTML(bazaarType, app, false);
                                        });
                                    });
                                }
                            }
                        });
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "install-all") {
                    confirmDialog("⬆️ " + window.siyuan.languages.updateAll, window.siyuan.languages.confirmUpdateAll, () => {
                        fetchPost("/api/bazaar/batchUpdatePackage", {frontend: getFrontend()});
                    });
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "feedback") {
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "install-t") {
                    if (!target.classList.contains("b3-button--progress")) {
                        confirmDialog("⬆️ " + window.siyuan.languages.update, window.siyuan.languages.confirmUpdate, () => {
                            const bazaarType = dataObj.bazaarType as TBazaarType;
                            let url = "/api/bazaar/installBazaarTemplate";
                            if (bazaarType === "themes") {
                                url = "/api/bazaar/installBazaarTheme";
                            } else if (bazaarType === "icons") {
                                url = "/api/bazaar/installBazaarIcon";
                            } else if (bazaarType === "widgets") {
                                url = "/api/bazaar/installBazaarWidget";
                            } else if (bazaarType === "plugins") {
                                url = "/api/bazaar/installBazaarPlugin";
                            }
                            if (!target.classList.contains("b3-button")) {
                                target.parentElement.insertAdjacentHTML("afterend", '<img data-type="img-loading" style="position: absolute;top: 0;left: 0;height: 100%;width: 100%;padding: 16px;box-sizing: border-box;" src="/stage/loading-pure.svg">');
                            }
                            fetchPost(url, {
                                keyword: (bazaar.element.querySelector(".config-bazaar__panel:not(.fn__none) .b3-form__icon-input") as HTMLInputElement).value,
                                repoURL: dataObj.repoURL,
                                packageName: dataObj.name,
                                repoHash: dataObj.repoHash,
                                mode: dataObj.themeMode === "dark" ? 1 : 0,
                                update: true,
                                frontend: getFrontend()
                            }, async response => {
                                this._genMyHTML(bazaarType, app);
                                bazaar._onBazaar(response, bazaarType, ["icons"].includes(bazaarType));
                                // https://github.com/siyuan-note/siyuan/issues/15177
                                if (bazaarType === "themes" && response.data.appearance?.themeVer) {
                                    window.siyuan.config.appearance.themeVer = response.data.appearance.themeVer;
                                }
                                // 更新主题后不需要对该主题进行切换 https://github.com/siyuan-note/siyuan/issues/4966
                                // https://github.com/siyuan-note/siyuan/issues/5411
                                if (bazaarType === "themes" && (
                                    (window.siyuan.config.appearance.mode === 0 && window.siyuan.config.appearance.themeLight === dataObj.name) ||
                                    (window.siyuan.config.appearance.mode === 1 && window.siyuan.config.appearance.themeDark === dataObj.name)
                                )) {
                                    const currentTheme = window.siyuan.config.appearance.mode === 1 ? window.siyuan.config.appearance.themeDark : window.siyuan.config.appearance.themeLight;
                                    if (window.siyuan.config.appearance.themeJS) {
                                        if (window.destroyTheme) {
                                            try {
                                                await window.destroyTheme();
                                                window.destroyTheme = undefined;
                                                document.getElementById("themeScript").remove();
                                                addScript(`/appearance/themes/${currentTheme}/theme.js?v=${response.data.appearance.themeVer}`, "themeScript");
                                            } catch (e) {
                                                console.error("destroyTheme error: " + e);
                                            }
                                        } else {
                                            exportLayout({
                                                cb() {
                                                    window.location.reload();
                                                },
                                                errorExit: false,
                                            });
                                            return;
                                        }
                                    }
                                    if ((window.siyuan.config.appearance.mode === 1 && currentTheme === "midnight") ||
                                        (window.siyuan.config.appearance.mode !== 1 && currentTheme === "daylight")) {
                                        (document.getElementById("themeDefaultStyle") as HTMLLinkElement).href = `/appearance/themes/${window.siyuan.config.appearance.mode === 1 ? "midnight" : "daylight"}/theme.css?v=${Constants.SIYUAN_VERSION}`;
                                    } else {
                                        (document.getElementById("themeStyle") as HTMLLinkElement).href = `/appearance/themes/${currentTheme}/theme.css?v=${response.data.appearance.themeVer}`;
                                    }
                                } else if (bazaarType === "plugins") {
                                    app.plugins.find((item: Plugin) => {
                                        if (item.name === dataObj.name) {
                                            reloadPlugin(app, {
                                                upsertPlugins: [dataObj.name],
                                                removePlugins: []
                                            });
                                            return true;
                                        }
                                    });
                                }
                            });
                        });
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "uninstall") {
                    const bazaarType = dataObj.bazaarType as TBazaarType;
                    let url = "/api/bazaar/uninstallBazaarTemplate";
                    if (bazaarType === "themes") {
                        url = "/api/bazaar/uninstallBazaarTheme";
                    } else if (bazaarType === "icons") {
                        url = "/api/bazaar/uninstallBazaarIcon";
                    } else if (bazaarType === "widgets") {
                        url = "/api/bazaar/uninstallBazaarWidget";
                    } else if (bazaarType === "plugins") {
                        url = "/api/bazaar/uninstallBazaarPlugin";
                    }

                    const packageName = dataObj.name;
                    if (window.siyuan.config.appearance.themeDark === packageName ||
                        window.siyuan.config.appearance.themeLight === packageName ||
                        window.siyuan.config.appearance.icon === packageName) {
                        showMessage(window.siyuan.languages.uninstallTip);
                    } else {
                        confirmDialog("⚠️ " + window.siyuan.languages.uninstall, window.siyuan.languages.confirmUninstall.replace("${name}", packageName), () => {
                            fetchPost(url, {
                                packageName,
                                keyword: (bazaar.element.querySelector(".config-bazaar__panel:not(.fn__none) .b3-form__icon-input") as HTMLInputElement).value,
                                frontend: getFrontend()
                            }, response => {
                                this._genMyHTML(bazaarType, app);
                                bazaar._onBazaar(response, bazaarType, ["themes", "icons"].includes(bazaarType));
                                if (bazaarType === "plugins") {
                                    uninstall(app, packageName, true);
                                }
                            });
                        });
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "switch") {
                    const bazaarType = dataObj.bazaarType as TBazaarType;
                    const packageName = dataObj.name;
                    const mode = dataObj.themeMode === "dark" ? 1 : 0;
                    if (bazaarType === "icons") {
                        fetchPost("/api/setting/setAppearance", Object.assign({}, window.siyuan.config.appearance, {
                            icon: packageName,
                        }), (appearanceResponse) => {
                            this._genMyHTML(bazaarType, app, false);
                            fetchPost("/api/bazaar/getBazaarIcon", {}, response => {
                                response.data.appearance = appearanceResponse.data;
                                bazaar._onBazaar(response, "icons", true);
                                bazaar._data.icons = response.data.packages;
                            });
                        });
                    } else if (bazaarType === "themes") {
                        fetchPost("/api/setting/setAppearance", Object.assign({}, window.siyuan.config.appearance, {
                            mode,
                            modeOS: false,
                            themeDark: mode === 1 ? packageName : window.siyuan.config.appearance.themeDark,
                            themeLight: mode === 0 ? packageName : window.siyuan.config.appearance.themeLight,
                        }), async (appearanceResponse) => {
                            if ((mode !== window.siyuan.config.appearance.mode ||
                                    (mode === 1 && window.siyuan.config.appearance.themeDark !== packageName) ||
                                    (mode === 0 && window.siyuan.config.appearance.themeLight !== packageName)) &&
                                window.siyuan.config.appearance.themeJS) {
                                if (window.destroyTheme) {
                                    try {
                                        await window.destroyTheme();
                                        window.destroyTheme = undefined;
                                        document.getElementById("themeScript").remove();
                                    } catch (e) {
                                        console.error("destroyTheme error: " + e);
                                    }
                                    window.siyuan.config.appearance = appearanceResponse.data;
                                    loadAssets(window.siyuan.config.appearance);
                                } else {
                                    exportLayout({
                                        cb() {
                                            window.location.reload();
                                        },
                                        errorExit: false,
                                    });
                                    return;
                                }
                            }
                            this._genMyHTML("themes", app, false);
                            fetchPost("/api/bazaar/getBazaarTheme", {}, response => {
                                response.data.appearance = appearanceResponse.data;
                                bazaar._onBazaar(response, "themes", true);
                                bazaar._data.themes = response.data.packages;
                            });
                        });
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "setting") {
                    app.plugins.find((item: Plugin) => {
                        if (item.name === dataObj.name) {
                            item.openSetting();
                            return true;
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (type === "plugins-enable") {
                    if (!target.getAttribute("disabled")) {
                        target.setAttribute("disabled", "disabled");
                        window.siyuan.config.bazaar.petalDisabled = !(target as HTMLInputElement).checked;
                        fetchPost("/api/setting/setBazaar", window.siyuan.config.bazaar, () => {
                            target.removeAttribute("disabled");
                            if (window.siyuan.config.bazaar.petalDisabled) {
                                bazaar.element.querySelectorAll("#configBazaarDownloaded .b3-card").forEach(item => {
                                    item.classList.add("b3-card--disabled");
                                    uninstall(app, JSON.parse(item.getAttribute("data-obj")).name);
                                });
                            } else {
                                bazaar.element.querySelectorAll("#configBazaarDownloaded .b3-card").forEach(item => {
                                    item.classList.remove("b3-card--disabled");
                                });
                                loadPlugins(app).then(() => {
                                    app.plugins.forEach(item => {
                                        afterLoadPlugin(item);
                                    });
                                });
                                saveLayout();
                            }
                        });
                    }
                    event.stopPropagation();
                    break;
                } else if (type === "plugin-enable") {
                    if (!target.getAttribute("disabled")) {
                        target.setAttribute("disabled", "disabled");
                        const enabled = (target as HTMLInputElement).checked;
                        fetchPost("/api/petal/setPetalEnabled", {
                            packageName: dataObj.name,
                            enabled,
                            frontend: getFrontend()
                        }, (response) => {
                            target.removeAttribute("disabled");
                            if (enabled) {
                                loadPlugin(app, response.data).then((plugin: Plugin) => {
                                    // @ts-ignore
                                    if (plugin.setting || plugin.__proto__.hasOwnProperty("openSetting")) {
                                        target.parentElement.querySelector('[data-type="setting"]').classList.remove("fn__none");
                                    } else {
                                        target.parentElement.querySelector('[data-type="setting"]').classList.add("fn__none");
                                    }
                                });
                            } else {
                                uninstall(app, dataObj.name);
                                target.parentElement.querySelector('[data-type="setting"]').classList.add("fn__none");
                            }
                        });
                    }
                    event.stopPropagation();
                    break;
                } else if (target.classList.contains("b3-card")) {
                    if (!hasClosestByClassName(event.target as HTMLElement, "b3-card__actions--right")) {
                        const dataObj = JSON.parse(target.getAttribute("data-obj"));
                        const bazaarType = (dataObj.bazaarType) as TBazaarType;
                        let data;
                        if (hasClosestByAttribute(target, "data-type", "downloaded-update")) {
                            data = bazaar._data.update[(dataObj.bazaarType) as TBazaarType].find((item: IBazaarItem) => item.repoURL === dataObj.repoURL);
                        } else {
                            data = (dataObj.downloaded ? bazaar._data.downloaded : bazaar._data[bazaarType]).find((item: IBazaarItem) => item.repoURL === dataObj.repoURL);
                        }
                        bazaar._renderReadme(bazaarType, data, dataObj.downloaded);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (target.classList.contains("item") && !target.classList.contains("item--focus")) {
                    // switch tab
                    bazaar.element.querySelector(".layout-tab-bar .item--focus").classList.remove("item--focus");
                    target.classList.add("item--focus");
                    bazaar.element.querySelectorAll(".config-bazaar__panel").forEach(item => {
                        if (type === item.getAttribute("data-type")) {
                            item.classList.remove("fn__none");
                            if (!item.getAttribute("data-init")) {
                                if (type === "template") {
                                    fetchPost("/api/bazaar/getBazaarTemplate", {}, response => {
                                        bazaar._onBazaar(response, "templates", false);
                                        bazaar._data.templates = response.data.packages;
                                    });
                                } else if (type === "icon") {
                                    fetchPost("/api/bazaar/getBazaarIcon", {}, response => {
                                        bazaar._onBazaar(response, "icons", false);
                                        bazaar._data.icons = response.data.packages;
                                    });
                                } else if (type === "widget") {
                                    fetchPost("/api/bazaar/getBazaarWidget", {}, response => {
                                        bazaar._onBazaar(response, "widgets", false);
                                        bazaar._data.widgets = response.data.packages;
                                    });
                                } else if (type === "theme") {
                                    fetchPost("/api/bazaar/getBazaarTheme", {}, response => {
                                        bazaar._onBazaar(response, "themes", false);
                                        bazaar._data.themes = response.data.packages;
                                    });
                                } else if (type === "plugin") {
                                    fetchPost("/api/bazaar/getBazaarPlugin", {
                                        frontend: getFrontend()
                                    }, response => {
                                        bazaar._onBazaar(response, "plugins", false);
                                        bazaar._data.plugins = response.data.packages;
                                    });
                                }
                                item.setAttribute("data-init", "true");
                            }
                        } else {
                            item.classList.add("fn__none");
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                } else if (target.classList.contains("item__preview")) {
                    target.classList.toggle("item__preview--fullscreen");
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
                target = target.parentElement;
            }
        });

        bazaar.element.querySelectorAll(".config-bazaar__panel .b3-form__icon > .b3-text-field").forEach((inputElement: HTMLInputElement) => {
            inputElement.addEventListener("keydown", (event) => {
                if (event.isComposing) {
                    return;
                }
                if (event.key === "Enter") {
                    const keyword = inputElement.value.trim();
                    const type = (hasClosestByClassName(inputElement, "config-bazaar__panel") as HTMLElement).getAttribute("data-type");
                    if (type === "template") {
                        fetchPost("/api/bazaar/getBazaarTemplate", {keyword}, response => {
                            bazaar._onBazaar(response, "templates", false);
                            bazaar._data.templates = response.data.packages;
                        });
                    } else if (type === "icon") {
                        fetchPost("/api/bazaar/getBazaarIcon", {keyword}, response => {
                            bazaar._onBazaar(response, "icons", false);
                            bazaar._data.icons = response.data.packages;
                        });
                    } else if (type === "widget") {
                        fetchPost("/api/bazaar/getBazaarWidget", {keyword}, response => {
                            bazaar._onBazaar(response, "widgets", false);
                            bazaar._data.widgets = response.data.packages;
                        });
                    } else if (type === "theme") {
                        fetchPost("/api/bazaar/getBazaarTheme", {keyword}, response => {
                            bazaar._onBazaar(response, "themes", false);
                            bazaar._data.themes = response.data.packages;
                        });
                    } else if (type === "plugin") {
                        fetchPost("/api/bazaar/getBazaarPlugin", {
                            frontend: getFrontend(),
                            keyword
                        }, response => {
                            bazaar._onBazaar(response, "plugins", false);
                            bazaar._data.plugins = response.data.packages;
                        });
                    } else if (type === "downloaded") {
                        const bazaarType = inputElement.parentElement.parentElement.querySelector(".b3-button:not(.b3-button--outline)").getAttribute("data-type").replace("my", "").toLowerCase() + "s" as TBazaarType;
                        this._genMyHTML(bazaarType, app);
                    }
                    event.preventDefault();
                    return;
                }
            });
        });

        bazaar.element.querySelectorAll(".b3-select").forEach((selectElement: HTMLSelectElement) => {
            selectElement.addEventListener("change", (event) => {
                if (selectElement.id === "bazaarSelect") {
                    // theme select
                    bazaar.element.querySelectorAll("#configBazaarTheme .b3-card").forEach((item) => {
                        const dataObj = JSON.parse(item.getAttribute("data-obj"));
                        if (selectElement.value === "0") {
                            if (dataObj.themeMode.indexOf("light") > -1) {
                                item.classList.remove("fn__none");
                            } else {
                                item.classList.add("fn__none");
                            }
                        } else if (selectElement.value === "1") {
                            if (dataObj.themeMode.indexOf("dark") > -1) {
                                item.classList.remove("fn__none");
                            } else {
                                item.classList.add("fn__none");
                            }
                        } else {
                            item.classList.remove("fn__none");
                        }
                    });
                    (event.target as HTMLElement).parentElement.querySelector(".counter").textContent = bazaar.element.querySelectorAll("#configBazaarTheme .b3-card:not(.fn__none)").length.toString();
                } else {
                    // sort
                    const localSort = window.siyuan.storage[Constants.LOCAL_BAZAAR];
                    const panelElement = selectElement.parentElement.parentElement;
                    let html = "";
                    const cardElements = Array.from(panelElement.querySelectorAll(".b3-card"));
                    if (selectElement.value === "0") { // 更新时间降序
                        cardElements.sort((a, b) => {
                            return JSON.parse(b.getAttribute("data-obj")).updated < JSON.parse(a.getAttribute("data-obj")).updated ? -1 : 1;
                        }).forEach((item) => {
                            html += item.outerHTML;
                        });
                    } else if (selectElement.value === "1") { // 更新时间升序
                        cardElements.sort((a, b) => {
                            return JSON.parse(b.getAttribute("data-obj")).updated < JSON.parse(a.getAttribute("data-obj")).updated ? 1 : -1;
                        }).forEach((item) => {
                            html += item.outerHTML;
                        });
                    } else if (selectElement.value === "2") { // 下载次数降序
                        cardElements.sort((a, b) => {
                            return JSON.parse(b.getAttribute("data-obj")).downloads < JSON.parse(a.getAttribute("data-obj")).downloads ? -1 : 1;
                        }).forEach((item) => {
                            html += item.outerHTML;
                        });
                    } else if (selectElement.value === "3") { // 下载次数升序
                        cardElements.sort((a, b) => {
                            return JSON.parse(b.getAttribute("data-obj")).downloads < JSON.parse(a.getAttribute("data-obj")).downloads ? 1 : -1;
                        }).forEach((item) => {
                            html += item.outerHTML;
                        });
                    }
                    localSort[selectElement.parentElement.parentElement.getAttribute("data-type")] = selectElement.value;
                    setStorageVal(Constants.LOCAL_BAZAAR, window.siyuan.storage[Constants.LOCAL_BAZAAR]);
                    if (cardElements.length > 1) {
                        html += '<div class="fn__flex-1" style="margin-left: 15px;min-width: 342px;"></div><div class="fn__flex-1" style="margin-left: 15px;min-width: 342px;"></div>';
                    }
                    panelElement.querySelector(".b3-cards").innerHTML = html;
                }
            });
        });
    },
    _onBazaar(response: IWebSocketData, bazaarType: TBazaarType, reload: boolean) {
        if (bazaar.element.querySelector("#configBazaarReadme").classList.contains("config-bazaar__readme--show")) {
            const dataObj = JSON.parse(bazaar.element.querySelector("#configBazaarReadme > .item__side").getAttribute("data-obj"));
            bazaar._renderReadme((dataObj.bazaarType) as TBazaarType,
                response.data.packages.find((item: IBazaarItem) => item.repoURL === dataObj.repoURL),
                dataObj.downloaded);
        }
        let id = "#configBazaarTemplate";
        if (bazaarType === "themes") {
            id = "#configBazaarTheme";
        } else if (bazaarType === "icons") {
            id = "#configBazaarIcon";
        } else if (bazaarType === "widgets") {
            id = "#configBazaarWidget";
        } else if (bazaarType === "plugins") {
            id = "#configBazaarPlugin";
        }
        const element = bazaar.element.querySelector(id);
        if (response.code === 1) {
            showMessage(response.msg);
            element.querySelectorAll("img[data-type='img-loading']").forEach((item) => {
                item.remove();
            });
        }
        let html = "";
        response.data.packages.forEach((item: IBazaarItem) => {
            html += this._genCardHTML(item, bazaarType);
        });
        bazaar._data[bazaarType] = response.data.packages;
        element.innerHTML = `<div class="b3-cards">${html}</div>`;
        element.parentElement.querySelector(".counter").textContent = element.querySelectorAll(".b3-card:not(.fn__none)").length.toString();
        const localSort = window.siyuan.storage[Constants.LOCAL_BAZAAR];
        if (localSort[bazaarType.replace("s", "")] === "1") {
            html = "";
            Array.from(element.querySelectorAll(".b3-card")).sort((a, b) => {
                return JSON.parse(b.getAttribute("data-obj")).updated < JSON.parse(a.getAttribute("data-obj")).updated ? 1 : -1;
            }).forEach((item) => {
                html += item.outerHTML;
            });
        } else if (localSort[bazaarType.replace("s", "")] === "2") { // 下载次数降序
            html = "";
            Array.from(element.querySelectorAll(".b3-card")).sort((a, b) => {
                return JSON.parse(b.getAttribute("data-obj")).downloads < JSON.parse(a.getAttribute("data-obj")).downloads ? -1 : 1;
            }).forEach((item) => {
                html += item.outerHTML;
            });
        } else if (localSort[bazaarType.replace("s", "")] === "3") { // 下载次数升序
            html = "";
            Array.from(element.querySelectorAll(".b3-card")).sort((a, b) => {
                return JSON.parse(b.getAttribute("data-obj")).downloads < JSON.parse(a.getAttribute("data-obj")).downloads ? 1 : -1;
            }).forEach((item) => {
                html += item.outerHTML;
            });
        }
        if (response.data.packages.length > 1) {
            html += '<div class="fn__flex-1" style="margin-left: 15px;min-width: 342px;"></div><div class="fn__flex-1" style="margin-left: 15px;min-width: 342px;"></div>';
        }
        element.innerHTML = `<div class="b3-cards">${html}</div>`;
        if (reload) {
            appearance.onSetAppearance(response.data.appearance);
        }
    }
};
