import React from 'react';
import cs from 'classnames';
import config from '@/config';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import { CloseOutlined, LeftOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';

import styles from './index.less';

class ViewModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 'fullScreen' + (new Date()).getTime(),
			fullScreen: false,
		};
		this.className = props['menuKey'].replace(/\//g, "-");
	}

	/**
	 * @description: 全屏切换功能
	 * @param {*}
	 * @return {*}
	 */
	openFullscreen = () => {
		const { id, fullScreen } = this.state;
		this.setState({
			fullScreen: !fullScreen,
		}, () => {
			if (!fullScreen) {
				this.requestFullscreen(id);
			} else {
				this.exitFullscreen(id);
			}
		});
	};
	requestFullscreen = name => {
		let de = document.querySelector(`#${name}`);
		if (de.requestFullscreen) {
			de.requestFullscreen();
		} else if (de.mozRequestFullScreen) {
			de.mozRequestFullScreen();
		} else if (de.webkitRequestFullScreen) {
			de.webkitRequestFullScreen();
		}
	};
	exitFullscreen = name => {
		let de = document;
		if (de.exitFullscreen) {
			de.exitFullscreen();
		} else if (de.mozCancelFullScreen) {
			de.mozCancelFullScreen();
		} else if (de.webkitCancelFullScreen) {
			de.webkitCancelFullScreen();
		}
	};

	/**
	 * @description: 关闭弹窗
	 * @param {*}
	 * @return {*}
	 */
	closeModal = () => {
		const { onClose } = this.props;
		onClose && onClose();
	};

	/**
	 * @description: 全屏Icon
	 * @param {*}
	 * @return {*}
	 */
	renderFullscreen = () => {
		const { fullScreen } = this.state;

		let Icon = fullScreen ? FullscreenExitOutlined : FullscreenOutlined;

		return (
			<Icon 
				className={styles.icon}
				onClick={() => {
					this.openFullscreen();
				}}
			/>
		)
	};

	render() {
		const { id } = this.state;
		const { type, index, fixed, zIndex, children, closeAll } = this.props;

		let menuKey = this.props['menuKey'].replace(/\//g, "-");

		if (closeAll) {
			// 通过修改dom元素，以此来更改内容，达到可同时关闭多个globalmodal
			let child = document.querySelectorAll('.globalChildModal');
			child[child.length - 1].childNodes[index].innerHTML = '';
			child[child.length - 1].childNodes[index].className = '';
			return ReactDOM.createPortal(children, child[child.length - 1]);
		} else {
			return (
				<div
					id={id}
					className={cs(
						`tabs${this.className}`,
						styles.modalBox,
						type !== 'left' && styles.flexFlow,
						config.isTabs && styles.tabsModalBox,
					)}
					style={{
						zIndex,
						display: menuKey === this.className ? 'flex' : 'none'
					}}
				>
					<div 
						className={cs(
							styles.operateBox,
							type === 'left' ? styles.operateLeftBox : styles.operateRightBox,
							fixed ? styles[`${fixed}Position`] : null,
						)}
						onClick={() => {
							type === 'left' && this.closeModal();
						}}
					>
						{type === 'left' ? (
							<React.Fragment>
								<LeftOutlined className={styles.icon} />
								<span>返回</span>
							</React.Fragment>
						) : (
							<React.Fragment>
								{this.renderFullscreen()}
								<CloseOutlined 
									className={styles.icon}
									onClick={() => {
										this.closeModal();
									}}
								/>
							</React.Fragment>
						)}
					</div>

					<div className={cs(
						styles.childBox,
						'globalChildModal',
					)}>
						{children}
					</div>
				</div>
			);

		}
	}
}

// ViewModal.propTypes = {
// 	closeAll: PropTypes.bool,
// }

/**
 * @description: 参数解释
 * @param {index} 多个弹窗，每个modal的前后位置，从0开始。
 * @param {closeAll} 通过修改dom元素，以此来更改内容，达到可同时关闭多个globalmodal。
 *                   提示：index和closeAll连用，且需要一个初始全局弹窗(用来关闭弹窗)。
 * 				     即第一个弹窗正常写参数，后续弹窗只写index、closeAll、showModal。
 * @param {type} 参数left：左侧返回，right：右侧全屏、关闭。
 * @param {fixed} 参数left：左侧浮动，right：右侧浮动。
 * @param {zIndex} 控制多个弹窗的z-index的层级。
 */
ViewModal.defaultProps = {
	index: 0, 
	type: 'right', 
	fixed: '',
	zIndex: '10', 
	closeAll: false
}

// 控制弹窗都在一个DOM内
const node = document.createElement('div');
// 函数式写法
function GlobalModal(props) {
	const { showModal } = props;
	
	React.useEffect(() => {
		let dom = document.querySelector('.ant-layout-content');
		node.className = `globalModal`;
		dom && dom.appendChild(node);
	}, []);

	return (
		showModal ? ReactDOM.createPortal(<ViewModal {...props} />, node) : null
	);
}

export default connect((state) => {
	return { menuKey: state.global.menuKey };
})(GlobalModal);
