import $ from '../../util/dom-core.js'
import { getRandom } from '../../util/util.js'
import Panel from '../panel.js'
import Aplayer from 'aplayer';

//TODO：没有提供模式选择


function MP3(editor) {
	this.editor = editor;
	this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-play"><i/></div>');
	this.type = 'panel';
	
	// 当前是否 active 状态
	this._active = false
}
MP3.prototype={
	constructor: MP3,
	
	onClick: function () {
		this._createPanel()
	},
	_createPanel: function () {
		// 创建 id
		const textValId1 = getRandom('text-val');
		const textValId2 = getRandom('text-val');
		const textValId3 = getRandom('text-val');
		const btnId = getRandom('btn');
		
		// 创建 panel
		const panel = new Panel(this, {
			width: 350,
			// 一个 panel 多个 tab
			tabs: [
				{
					// 标题
					title: '插入音频',
					// 模板
					
					//https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3
					tpl: `<div>
                        <input id="${textValId1}" type="text" class="block" placeholder="歌名"/>
                        <input id="${textValId2}" type="text" class="block" placeholder="创作者"/>
                        <input id="${textValId3}" type="text" class="block" placeholder="链接"/>
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
								const $text1 = $('#' + textValId1)[0];
								const $text2 = $('#' + textValId2)[0];
								const $text3 = $('#' + textValId3)[0];
								// const val = $text.val().trim();
								let val = '<div contenteditable="true"><div id="aplayer1" class="aplayer" contenteditable="false"></div></div>';
								// 测试用视频地址
								// <iframe height=498 width=510 src='http://player.youku.com/embed/XMjcwMzc3MzM3Mg==' frameborder=0 'allowfullscreen'></iframe>
								
								if (val) {
									// 插入mp3
									this._insert(val,{url:$text3.value,author:$text2.value,tittle:$text1.value})
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
	_insert: function (val,{url,tittle,author}) {
		const editor = this.editor;
		editor.cmd.do('insertHTML', '<p><br></p>'+val + '<p><br></p>');
		let ap = new Aplayer({
			element: document.getElementById('aplayer1'),
			music: {
				title: tittle,
				author: author,
				url: url,
			}
		});
	}
};


export default MP3;