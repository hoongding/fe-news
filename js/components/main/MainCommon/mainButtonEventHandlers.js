import { dispatch, getStoreState } from '../../../store/store.js';
import { displayActionCreator } from '../../../actions/actions.js';

const VIEW_BTN_CLASS = {
  ALL: 'main-header__all-media',
  MINE: 'main-header__my-media',
  LIST: 'main-header__list-button',
  GRID: 'main-header__grid-button',
};

export const pageControlBtnClickEventHandler = ({ target, currentTarget }) => {
  const $targetButton = target.closest('a');
  if (!$targetButton) return;
  const $mainSection = currentTarget.parentNode.lastChild;
  const viewOptionData = getStoreState('viewOptionData').viewOption;
  // TODO : 전체 언론사 grid일때, list일때, 다 다른 event를 부여해야함.
  // Case 문으로 좀 빼야할듯...
  if ($targetButton.classList.contains('left-button')) {
    const direction = 'left';
    ButtonClickEventHandler(
      viewOptionData,
      direction,
      $mainSection,
      $targetButton,
    );
  } else if ($targetButton.classList.contains('right-button')) {
    const direction = 'right';
    ButtonClickEventHandler(
      viewOptionData,
      direction,
      $mainSection,
      $targetButton,
    );
  }
};

export const headerViewChangeBtnClickEventHandler = ({
  target,
  currentTarget,
}) => {
  // TODO : 그리드 버튼, 리스트 버튼에 dispatch 다르게 해줘야함!!
  // 이 이벤트 핸들러는 이벤트 헨들러 js 파일로 옮기기!
  // 아마 case 문으로 싹 바꿔서 해야할듯!

  const $clickedBtn = target.closest('a');
  const [$listBtn, $gridBtn] = currentTarget.querySelectorAll('i');

  let $unClickedBtn;
  if (!$clickedBtn) return;
  switch ($clickedBtn.classList[0]) {
    case VIEW_BTN_CLASS.ALL:
      $unClickedBtn = $clickedBtn.nextElementSibling;
      $clickedBtn.classList.add('bold');
      $unClickedBtn.classList.remove('bold');
      $gridBtn.classList.add('grid-icon__enable');
      $listBtn.classList.remove('list-icon__enable');
      dispatch(displayActionCreator.headerAllBtnClick());
      break;

    case VIEW_BTN_CLASS.MINE:
      $unClickedBtn = $clickedBtn.previousElementSibling;
      $clickedBtn.classList.add('bold');
      $unClickedBtn.classList.remove('bold');
      $listBtn.classList.add('list-icon__enable');
      $gridBtn.classList.remove('grid-icon__enable');
      dispatch(displayActionCreator.headerMineBtnClick());
      break;

    case VIEW_BTN_CLASS.LIST:
      $listBtn.classList.add('list-icon__enable');
      $gridBtn.classList.remove('grid-icon__enable');
      dispatch(displayActionCreator.headerListBtnClick());
      break;

    case VIEW_BTN_CLASS.GRID:
      $gridBtn.classList.add('grid-icon__enable');
      $listBtn.classList.remove('list-icon__enable');
      dispatch(displayActionCreator.headerGridBtnClick());
      break;

    default:
      break;
  }
};

const ButtonClickEventHandler = (
  viewOptionData,
  direction,
  $mainSection,
  $targetButton,
) => {
  if (direction === 'left')
    leftSwitchCase(viewOptionData, $mainSection, $targetButton);
  else rightSwitchCase(viewOptionData, $mainSection, $targetButton);
};

const leftSwitchCase = (viewOptionData, $mainSection, $targetButton) => {
  const allOrMine = viewOptionData.allOrMine;
  const gridOrList = viewOptionData.gridOrList;
  switch (true) {
    case allOrMine === 'all' && gridOrList === 'grid':
      gridButtonClickHandler('left', $mainSection, $targetButton);
      break;
    case allOrMine === 'all' && gridOrList === 'list':
      dispatch(displayActionCreator.listLeftBtnClick());
      break;
    case allOrMine === 'mine' && gridOrList === 'grid':
      break;
    case allOrMine === 'mine' && gridOrList === 'list':
      dispatch(displayActionCreator.mineListLeftBtnClick());
      break;
  }
};

const rightSwitchCase = (viewOptionData, $mainSection, $targetButton) => {
  const allOrMine = viewOptionData.allOrMine;
  const gridOrList = viewOptionData.gridOrList;
  switch (true) {
    case allOrMine === 'all' && gridOrList === 'grid':
      gridButtonClickHandler('right', $mainSection, $targetButton);
      break;
    case allOrMine === 'all' && gridOrList === 'list':
      dispatch(displayActionCreator.listRightBtnClick());
      break;
    case allOrMine === 'mine' && gridOrList === 'grid':
      break;
    case allOrMine === 'mine' && gridOrList === 'list':
      dispatch(displayActionCreator.mineListRightBtnClick());
      break;
  }
};

const gridButtonClickHandler = (direction, $mainSection, $targetButton) => {
  const directionNum = direction === 'left' ? -1 : 1;
  // some 메서드 : true가 중간에 return 되면 break!
  Array.from($mainSection.childNodes).some((node, idx, arr) => {
    if (node.classList.contains('grid')) {
      node.classList.replace('grid', 'none');
      arr[idx + directionNum].classList.replace('none', 'grid');
      gridButtonHandler(idx + directionNum, $targetButton, direction);
      return true;
    }
  });
};

const gridButtonHandler = (index, $targetButton, direction) => {
  switch (index) {
    case 0:
      $targetButton.classList.add('none');
      break;

    case 1:
      if (direction === 'right') {
        $targetButton.parentNode
          .querySelector('.left-button')
          .classList.remove('none');
      }
      break;

    case 2:
      if (direction === 'left') {
        $targetButton.parentNode
          .querySelector('.right-button')
          .classList.remove('none');
      }
      break;

    case 3:
      $targetButton.classList.add('none');
      break;

    default:
      break;
  }
};
