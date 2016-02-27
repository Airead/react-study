'use strict';
import React from 'react';
import Page from './Page';
import qs from 'querystring';
import request from 'superagent';
import lodash from 'lodash';

var symbols = `ღ ❣ ❤ ❥ ❦ ❧ ♣ ♦ ♥ ♠
☚ ☛ ☜ ☝ ☞ ☟ ✌ ✍
♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
♩ ♪ ♫ ♬ ♭ ♮ ♯
ϟ ☀ ☁ ☂ ☃ ☄ ☉ ☼ ☽ ☾ ♁ ♨ ❄ ❅ ❆
☠ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☮ ☭ ☯ ☸ ☽ ☾ ♕ ♚ ♛ ✙ ✚ ✛ ✜ ✝ ✞ ✟ ✠ ✡ ✢ 卍 卐
‱ № ℗ ℠ ℡ ℀ ℁ ℅ ℆ ⅍ ⌚ ⌛ ☊ ☎ ☏ ✁ ✂ ✃ ✄ ✆ ✇ ✈ ✉ ✍ ✎ ✏ ✐ ✑ ✒ ™ © ® ‰ § ¶
⏎ ⇧ ⇪ ⌂ ⌘ ☢ ☣ ⌥ ⎋ ⌫  ᴴᴰ
♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
ˇ ∛ ∜ ☐ ☑ ☒ ✓ ✔ ✗ ✘ ∨ √
♡ ♢ ♤ ♧ ♣ ♦ ♥ ♠
☹ ☺ ☻ ☿ ♀ ♂ ツ ㋡ 웃 유
★ ☆ ✡ ✦ ✧ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ✰
⁂ ⁎ ⁑ ☸ ✢ ✣ ✤ ✥ ✱ ✲ ✳ ✴ ✵ ✶ ✷ ✸ ✹ ✺ ✻ ✼ ✽ ✾ ✿ ❀ ❁ ❂ ❃ ❇ ❈ ❉ ❊ ❋
↕ ↖ ↗ ↘ ↙ ↚ ↛ ↜ ↝ ↞ ↟ ↠ ↡ ↢ ↣ ↤ ↥ ↦ ↧ ↨ ↩ ↪ ↫ ↬ ↭ ↮ ↯ ↰ ↱ ↲ ↳ ↴ ↶ ↷ ↸ ↹ ↺ ↻ ↼ ↽ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇅ ⇆ ⇇ ⇈ ⇉ ⇊ ⇋ ⇌ ⇍ ⇎ ⇏ ⇕ ⇖ ⇗ ⇘ ⇙ ⇚ ⇛ ⇜ ⇝ ⇞ ⇟ ⇠ ⇡ ⇢ ⇣ ⇤ ⇥ ⇦ ⇧ ⇨ ⇩ ⇪ ⌅ ⌆ ⌤ ⏎ ▶ ☇ ☈ ☊ ☋ ☌ ☍ ➔ ➘ ➙ ➚ ➛ ➜ ➝ ➞ ➟ ➠ ➡ ➢ ➣ ➤ ➥ ➦ ➧ ➨ ➩ ➪ ➫ ➬ ➭ ➮ ➯ ➱ ➲ ➳ ➴ ➵ ➶ ➷ ➸ ➹ ➺ ➻ ➼ ➽ ➾ ⤴ ⤵ ↵ ↓ ↔ ← → ↑
ˍ ∎ ⊞ ⊟ ⊠ ⊡ ⋄ ⎔ ▀ ▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▉ ▊ ▋ ▋ ▌ ▍ ▎ ▏ ▐ ░ ▒ ▓ ▔ ■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ ▯ ▰ ▱ ► ◄ ◆ ◇ ◈ ◘ ◙ ◚ ◛ ◢ ◣ ◤ ◥ ◧ ◨ ◩ ◪ ◫ ☖ ☗ ❏ ❐ ❑ ❒ ❖ ❘ ❙ ❚ ◊
∆ ⊿ ▲ △ ▴ ▵ ▶ ▷ ▸ ▹ ► ▻ ▼ ▽ ▾ ▿ ◀ ◁ ◂ ◃ ◄ ◅ ◢ ◣ ◤ ◥ ◬ ◭ ◮ ∇
 ˊ ᐟ ‐ ‑ ‒ ― ⁃ ≣ ⋐ ⋑ ⋒ ⋓ ⌒ ⌜ ⌝ ⌞ ⌟ ⎯ ─ ━ │ ┃ ┄ ┅ ┆ ┇ ┈ ┉ ┊ ┋ ┌ ┍ ┎ ┏ ┐ ┑ ┒ ┓ └ └ ┕ ┖ ┗ ┘ ┙ ┚ ┛ ├ ├ ┝ ┞ ┟ ┠ ┡ ┢ ┣ ┤ ┥ ┦ ┧ ┨ ┩ ┪ ┫ ┬ ┭ ┮ ┯ ┰ ┱ ┲ ┳ ┴ ┵ ┶ ┷ ┸ ┹ ┺ ┻ ┼ ┽ ┾ ┿ ╀ ╁ ╂ ╃ ╄ ╅ ╆ ╇ ╈ ╉ ╊ ╋ ╌ ╍ ╎ ╏ ═ ═ ║ ╒ ╓ ╔ ╔ ╔ ╕ ╕ ╖ ╖ ╗ ╗ ╘ ╙ ╚ ╚ ╛ ╛ ╜ ╜ ╝ ╝ ╞ ╟ ╟ ╠ ╡ ╡ ╢ ╢ ╣ ╣ ╤ ╤ ╥ ╥ ╦ ╦ ╧ ╧ ╨ ╨ ╩ ╩ ╪ ╪ ╫ ╬ ╬ ╭ ╮ ╯ ╰ ╱ ╲ ╳ ╴ ╵ ╶ ╷ ╸ ╹ ╺ ╻ ╼ ╽ ╾ ╿ ▏ ▕ ◜ ◝ ◞ ◟ ◠ ◡ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ✕ ≡ ⌈ ⌊ — ⌉ ⌋
⊖ ⊘ ⊙ ⊚ ⊛ ⊜ ⊝ ◉ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◦ ◯ ❍ ⦿ ⊕ ⊗
¼ ½ ¾ ⅐ ⅑ ⅒ ⅓ ⅔ ⅕ ⅖ ⅗ ⅘ ⅙ ⅚ ⅛ ⅜ ⅝ ⅞ ⅟ ↉ ∟ ∬ ∭ ∮ ∵ ∷ ≦ ≧ ╳ ✕ ✖ ✚ ﹢ ﹣ ﹤ ﹥ ％ ＋ － ／ ＝ ∧ ∠ ∩ ∪ ° ÷ ≡ ≥ ∞ ∫ ≤ ≠ ∨ ‰ ‱ ⊥ π ± √ ∑ ∴ ×
℃ ℉ ㎎ ㎏ ㎜ ㎝ ㎞ ㎡ ㏄ ㏎ ㏑ ㏒ ㏕ °
₮ ৲ ৳ ௹ ฿ ៛ ₠ ₡ ₢ ₣ ₤ ₥ ₦ ₧ ₨ ₩ ₪ ₫ ₭ ₯ ₰ ₱ ₲ ₳ ₴ ₵ ￥ ﷼ ¢ ¤ € ƒ £ ¥`;

symbols = symbols.split(/[ \n]/).join('');

function getSymbolText(symbols, num) {
    var max = symbols.length;

    var text = [];
    var i = 0;
    while (i < num) {
        var rnd = parseInt(max * Math.random());
        text.push(symbols[rnd]);
        i++;
    }

    return text.join('');
}

var text = getSymbolText(symbols, 10000);
/*
    一段文字分为n页，一页分为n行，一行分为n眼跳，每次眼跳颜色随之变动，
    如果当页结束，则开始下一页

    数据设计:
        text = {
            index: 0,
            pages: [
                {
                    index: 0,
                    lines: [
                        {
                            index: 0,
                            glances: []
                        }
                    ]
                }
            ]
        }
        或
        text = [page, page]
        page = [line, line]
        line = [glance, glance]
*/
export default class ReadRealPractise extends React.Component {
    static defaultProps = {
        width: '50em',
        pageLineNum: 23,
        lineFontNum: 39,
        glanceFontNum: 13,
        delay: 300,
        textSrc: null,
        text: text,
        isShuffle: '1',
    };

    interval = null;
    _text = '';
    lastTick = 0;

    state = {
        pageIndex: 0,
        lineIndex: 0,
        glanceIndex: -1,
    };

    constructor(props) {
        super(props);
        this.pages = [];
        this.lines = [];
        var {textSrc} = this.getProps();
        if (!textSrc) textSrc = '/libtxt/1.txt';

        if (textSrc) {
            this.getText(textSrc);
        } else {
            this.formatText(this.props.text);
        }
    }

    getText(textSrc) {
        var self = this;
        console.log('get text from', textSrc);
        request
            .get(textSrc)
            .end(function(err, res) {
                if (err) {
                    console.log('request error', textSrc, err);
                    return;
                }
                // console.log('get text', res.text);
                self._text = res.text;
                self.formatText(res.text);
                self.forceUpdate();
            });
    }

    getProps() {
        var query = qs.parse(location.hash.split('?')[1] || '');
        return Object.assign({}, this.props, query);
    }

    setPage() {
        var {pageIndex} = this.getProps();
        if (pageIndex) this.state.pageIndex = parseInt(pageIndex);
    }

    updatePage(pageIndex) {
        var query = qs.parse(location.hash.split('?')[1] || '');
        query.pageIndex = pageIndex;
        location.hash = '?' + qs.stringify(query);
    }

    updatePageDelay(delay) {
        self = this;
        this.stopTick();
        setTimeout(function() {
            self.startTick();
        }, delay);
    }

    formatText(text) {
        var {isShuffle} = this.getProps();
        this.setPage();
        this.lines = this.getLines(text);
        var glanceLines = this.getGlanceLines(this.lines);
        this.pages = this.getPages(glanceLines);
        if (isShuffle === '1') {
            this.shullfeGlance(this.pages);
        }
        // console.log('pages', this.pages);

    }

    shullfeGlance(pages) {
        var self = this;
        pages.forEach((lines) => {
            lines.forEach((glances) => {
                for (let i = 0; i < glances.length; i++) {
                    glances[i] = self.shuffle(glances[i].split('')).join('');
                }
            });
        });
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items The array containing the items.
     * @return {Array} a The shuffled array
     */
    shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }

        return a;
    }

    splitArray(arr, maxNum) {
        var ret = [];
        while (arr.length > maxNum) {
            ret.push(arr.slice(0, maxNum));
            arr = arr.slice(maxNum);
        }
        if (arr.length > 0) {
            ret.push(arr);
        }

        return ret;
    }

    getLines(text) {
        var {lineFontNum} = this.getProps();
        var lines = [];
        var originLines = text.split('\n');
        originLines.forEach((line) => {
            let fixNumLine = this.splitArray(line, lineFontNum);
            lines.push(...fixNumLine);
        });
        return lines;
    }

    getGlanceLines(lines) {
        var {glanceFontNum} = this.getProps();
        var glanceLines = [];
        lines.forEach((line) => {
            var gline = this.splitArray(line, glanceFontNum);
            glanceLines.push(gline);
        });

        return glanceLines;
    }

    getPages(glanceLines) {
        var {pageLineNum} = this.getProps();
        var pages = this.splitArray(glanceLines, pageLineNum);
        return pages;
    }

    componentWillUnmount() {
        this.stopTick();
    }

    startTick() {
        console.log('start tick');
        if (this.interval) return;
        var {delay} = this.getProps();
        this.interval = setInterval(() => {
            this.tick();
        }, delay);
    }

    stopTick() {
        console.log('stop tick');
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    tick() {
        console.log("tick");
        var {pageIndex, lineIndex, glanceIndex} = this.state;
        var pageTotal = this.pages.length;
        var curPage = this.pages[pageIndex];
        var lineTotal = curPage.length;
        var line = curPage[lineIndex];
        var glanceTotal = line.length;

        var maxNums = [pageTotal, lineTotal, glanceTotal];
        var curStates = [pageIndex, lineIndex, glanceIndex];
        for (let i = curStates.length - 1; i >= 0; i--) {
            if (curStates[i] < maxNums[i] - 1) {
                curStates[i]++;
                break;
            }
            curStates[i] = 0;
        }
        var state = {};
        [state.pageIndex, state.lineIndex, state.glanceIndex] = curStates;
        // console.log('state', this.state);
        if (this.state.pageIndex != state.pageIndex) {
            this.updatePage(state.pageIndex);
            state.glanceIndex = -1;
            this.updatePageDelay(300);
        }
        this.setState(state);
    }

    onClick(e) {
        // console.log('on click', e);
        if (this.interval) {
            this.stopTick();
        } else {
            this.startTick();
        }
    }

    onKeyUp(e) {
        console.log('keyUp', e);
    }

    render() {
        var {width} = this.getProps();
        var {pageIndex, ...other} = this.state;
        var lines = this.pages[pageIndex] || [];
        var style = {
            float: 'left',
            'marginLeft': '-200px'
        };
        return (
            <div className="read-page-container" onClick={this.onClick.bind(this)} >
                <span onKeyUp={this.onKeyUp.bind(this)} style={style}>{this.state.pageIndex}/{this.pages.length}</span>
                <Page {...other} lines={lines}/>
            </div>
        );
    }
}
