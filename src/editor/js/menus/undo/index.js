/*
    undo-menu
*/
import $ from '../../util/dom-core.js'

// 构造函数
function Undo(editor) {
    this.editor = editor;
    this.$elem = $(
        `<div class="w-e-menu">
            <i class="w-e-icon-undo"><i/>
        </div>`
    );
    this.type = 'click';

    // 当前是否 active 状态
    this._active = false
}

// 原型
Undo.prototype = {
    constructor: Undo,

    // 点击事件
    onClick: function (e) {
        // 点击菜单将触发这里

        const editor = this.editor;

        // 执行 undo 命令
        editor.cmd.do('undo');
	    let editorDom = document.getElementById(editor.textElemId);
	    let rubys = Array.from(editorDom.querySelectorAll("ruby"));
	    rubys.forEach((item)=>{
		    item.contentEditable = "false";
	    })
    }
};

export default Undo