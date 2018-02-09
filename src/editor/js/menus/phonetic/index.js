import $ from '../../util/dom-core.js';
import Panel from "../panel";
import { getRandom } from '../../util/util.js'
//TODO:有bug没有解决，就是无法在注释后面输入了。
function Phonetic(editor) {
	this.editor = editor;
	this.$elem = $(
		`<div class="w-e-menu">
            <i class="w-e-icon-bold"><i/>
        </div>`
	);
	this.type = 'panel';
	
	// 当前是否 active 状态
	this._active = false
}


Phonetic.prototype = {
	constructor: Phonetic,
	
	// 点击事件
	onClick: function (e) {
		// 点击菜单将触发这里
		
		const editor = this.editor;
		const isSeleEmpty = editor.selection.isSelectionEmpty();
		
		if (isSeleEmpty) {
			// 选区是空的，插入并选中一个“空白”
			editor.selection.createEmptyRange()
		}
		
		this._createPanel();
		if (isSeleEmpty) {
			// 需要将选取折叠起来
			editor.selection.collapseRange();
			editor.selection.restoreSelection()
		}
	},
	_createPanel: function () {
		// 创建 id
		const textValId = getRandom('text-val');
		const btnId = getRandom('btn');
		
		// 创建 panel
		const panel = new Panel(this, {
			width: 350,
			// 一个 panel 多个 tab
			tabs: [
				{
					// 标题
					title: '插入注释',
					// 模板
					
					//https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3
					tpl: `<div>
                        <input id="${textValId}" type="text" class="block" placeholder="注释内容"/>
                        <div class="w-e-button-container">
                            <button id="${btnId}" class="right">插入</button>
                        </div>
                    </div>`,
					// 事件绑定
					events: [
						{
							selector: '#' + btnId,
							type: 'click',
							fn: () => {
								const $text = $('#' + textValId);
								const val = $text.val().trim();
								if (val) {
									// 插入注释
									this._insert(val)
								}
								// 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
								return true
							}
						}
					]
				} // first tab end
			] // tabs end
		}); // panel end
		
		// 显示 panel
		panel.show();
		
		// 记录属性
		this.panel = panel
	},
	_insert: function (val) {
		const editor = this.editor;
		// 执行 phonetic 命令
		editor.cmd.do('phonetic',val);
	}
};


export default Phonetic