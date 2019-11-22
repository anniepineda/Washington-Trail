var choicePanel = document.getElementById('panel');

function clickHandler(event) {
  // console.log('Clicked! ', event.target.id);
  switch(event.target.id) {
    case 'leftImg':
      console.log('you clicked on left');
      break;
    case 'centerImg':
      console.log('you clicked on center');
      break;
    case 'rightImg':
      console.log('you clicked on right');
      break;
    default:
      console.log('blam', event.target.id);

  }
}

choicePanel.addEventListener('click', clickHandler);