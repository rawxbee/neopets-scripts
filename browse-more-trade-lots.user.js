// ==UserScript==
// @name         Neopets: Browse More Trade Lots
// @author       rawbeee
// @version      1.0.2
// @description  Adds pagination to the Trading Post search results
// @match        *://www.neopets.com/island/tradingpost.phtml*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const PAGE_SIZE = 20;

    let currentOffset = 0;
    let lastTotalCount = null;
    let lastSearchKey = null;
    let paginationEnabled = true;
    let suppressNextKeyResetOnce = false;

    let pagerContainer = null;
    let prevBtn = null;
    let nextBtn = null;
    let pageSpan = null;

    function parseBrowseParamsFromUrl() {
        let paramsStr = '';
        const hash = window.location.hash || '';

        if (hash.includes('?')) {
            paramsStr = hash.split('?')[1].split('#')[0];
        } else {
            const search = window.location.search || '';
            if (search.startsWith('?')) paramsStr = search.slice(1);
        }

        if (!paramsStr) return null;

        const sp = new URLSearchParams(paramsStr);
        const type = sp.get('type') || '';
        if (type !== 'browse') return null;

        return {
            type,
            criteria: sp.get('criteria') || '',
            search_string: sp.get('search_string') || '',
            sort: sp.get('sort') || ''
        };
    }

    function applyInitialSearchUIFromUrl() {
        const params = parseBrowseParamsFromUrl();
        if (!params) return;

        const input = document.querySelector('.tp-main-content input[placeholder="Search"]');
        if (input && !input.value && params.search_string) {
            input.value = params.search_string;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            suppressNextKeyResetOnce = true;
        }
    }

    const nativeFetch = window.fetch;
    window.fetch = function (input, init) {
        init = init || {};
        let url = '';

        try {
            url = typeof input === 'string' ? input : (input && input.url) || '';
        } catch (_) {}

        const isBrowseReq =
            url.includes('/np-templates/ajax/island/tradingpost/tradingpost-list.php') &&
            init.method === 'POST' &&
            typeof init.body === 'string';

        if (isBrowseReq) {
            try {
                const payload = JSON.parse(init.body);
                if (payload && payload.type === 'browse') {
                    const key = JSON.stringify({
                        criteria: payload.criteria || '',
                        search_string: payload.search_string || '',
                        sort: payload.sort || ''
                    });

                    if (lastSearchKey !== null && key !== lastSearchKey) {
                        if (suppressNextKeyResetOnce) {
                            suppressNextKeyResetOnce = false;
                        } else {
                            currentOffset = 0;
                            lastTotalCount = null;
                        }
                    }
                    lastSearchKey = key;

                    const criteria = payload.criteria || '';
                    if (!criteria || criteria === '20') {
                        paginationEnabled = false;
                        currentOffset = 0;
                        if ('offset' in payload) delete payload.offset;
                    } else {
                        paginationEnabled = true;
                        payload.offset = currentOffset;
                    }

                    init.body = JSON.stringify(payload);
                }
            } catch (_) {}
        }

        const p = nativeFetch.call(this, input, init);

        if (isBrowseReq) {
            p.then(res => {
                try {
                    res.clone().json().then(data => {
                        if (data && typeof data.totalCount !== 'undefined') {
                            lastTotalCount = data.totalCount;
                            setTimeout(() => {
                                addPagerBelowOrder();
                                updateButtons();
                            }, 0);
                        }
                    }).catch(() => {});
                } catch (_) {}
            }).catch(() => {});
        }

        return p;
    };

    function triggerSearch() {
        const imgBtn = document.querySelector('img[alt="search-icon"]');
        if (imgBtn) {
            imgBtn.click();
            return;
        }

        const input = document.querySelector('.tp-main-content input[placeholder="Search"]');
        if (input) {
            input.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true
            }));
        }
    }

    function updateButtons() {
        if (!pagerContainer) return;

        pagerContainer.style.display = paginationEnabled ? 'flex' : 'none';
        if (!paginationEnabled) return;

        const page = Math.floor(currentOffset / PAGE_SIZE) + 1;
        if (pageSpan) pageSpan.textContent = `Page ${page}`;

        if (prevBtn) {
            const disabled = currentOffset <= 0;
            prevBtn.disabled = disabled;
            prevBtn.style.opacity = disabled ? '0.5' : '1';
            prevBtn.style.cursor = disabled ? 'default' : 'pointer';
        }

        if (nextBtn) {
            const disabled = lastTotalCount === 0;
            nextBtn.disabled = disabled;
            nextBtn.style.opacity = disabled ? '0.5' : '1';
            nextBtn.style.cursor = disabled ? 'default' : 'pointer';
        }
    }

    function addPagerBelowOrder() {
        const newestOption = document.querySelector('.tp-main-content select option[value="newest"]');
        if (!newestOption) return;

        const orderSelect = newestOption.parentElement;
        if (!orderSelect) return;

        const orderColumn = orderSelect.closest('.self-center');
        if (!orderColumn) return;

        const existing = orderColumn.querySelector('#tp-offset-pager');
        if (existing) {
            pagerContainer = existing;
            prevBtn = existing.querySelector('.tp-offset-prev');
            nextBtn = existing.querySelector('.tp-offset-next');
            pageSpan = existing.querySelector('.tp-offset-page');
            return;
        }

        const wrap = document.createElement('div');
        wrap.id = 'tp-offset-pager';
        wrap.style.display = 'flex';
        wrap.style.justifyContent = 'center';
        wrap.style.alignItems = 'center';
        wrap.style.gap = '8px';
        wrap.style.marginTop = '8px';
        wrap.style.padding = '4px 6px';
        wrap.style.background = '#fff';
        wrap.style.borderRadius = '8px';
        wrap.style.border = '1px solid #ddd';
        wrap.style.fontSize = '12px';

        const makeBtn = (label, cls) => {
            const btn = document.createElement('button');
            btn.textContent = label;
            btn.className = cls;
            btn.style.padding = '2px 10px';
            btn.style.height = '26px';
            btn.style.borderRadius = '6px';
            btn.style.border = '1px solid #6e70b0';
            btn.style.background = '#8f91d6';
            btn.style.color = '#fff';
            btn.style.cursor = 'pointer';
            btn.style.fontWeight = 'bold';
            return btn;
        };

        prevBtn = makeBtn('Prev', 'tp-offset-prev');
        nextBtn = makeBtn('Next', 'tp-offset-next');

        pageSpan = document.createElement('span');
        pageSpan.className = 'tp-offset-page';
        pageSpan.textContent = 'Page 1';
        pageSpan.style.fontWeight = 'bold';
        pageSpan.style.color = '#000';

        prevBtn.onclick = e => {
            e.stopPropagation();
            if (!paginationEnabled || currentOffset <= 0) return;
            currentOffset = Math.max(0, currentOffset - PAGE_SIZE);
            triggerSearch();
            updateButtons();
        };

        nextBtn.onclick = e => {
            e.stopPropagation();
            if (!paginationEnabled || lastTotalCount === 0) return;
            currentOffset += PAGE_SIZE;
            triggerSearch();
            updateButtons();
        };

        wrap.append(prevBtn, pageSpan, nextBtn);
        orderColumn.appendChild(wrap);

        pagerContainer = wrap;
        updateButtons();
    }

    function init() {
        applyInitialSearchUIFromUrl();
        addPagerBelowOrder();
        updateButtons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
