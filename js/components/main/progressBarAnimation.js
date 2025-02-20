import { dispatch, getStoreState } from '../../store/store.js';
import { displayActionCreator } from '../../actions/actions.js';
export const animationStart = ($progressBar) => {
  const viewOption = getStoreState('viewOptionData').viewOption;
  let startTime = null;
  const progressBarAnimation = (timestamp) => {
    if (startTime === null) startTime = timestamp;
    const duration = timestamp - startTime;

    if (duration <= 20000) {
      $progressBar.style.background = `linear-gradient(90deg, #4362d0 ${
        (duration / 20000) * 100
      }%, #7890e7 0%)`;
      dispatch(
        displayActionCreator.progressBarAnimationStart(
          requestAnimationFrame(progressBarAnimation),
        ),
      );
    } else {
      if (viewOption.allOrMine === 'all')
        dispatch(displayActionCreator.listRightBtnClick());
      else if (viewOption.allOrMine === 'mine')
        dispatch(displayActionCreator.mineListRightBtnClick());
    }
  };
  dispatch(
    displayActionCreator.progressBarAnimationStart(
      requestAnimationFrame(progressBarAnimation),
    ),
  );
};
