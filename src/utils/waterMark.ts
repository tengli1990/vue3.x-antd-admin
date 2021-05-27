'use strict';

const setWatermark: (strs: any[]) => any = function (strs: any) {
  const id = '_water_mark';
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as any);
  }

  const can: any = document.createElement('canvas');
  can.width = 250;
  can.height = 250;

  const ctx: any = can.getContext('2d');

  // 中心位置旋转
  strs.forEach((str: string|number, index: number):void => {
    const strWidth = ctx.measureText(str).width;
    ctx.save();
    ctx.translate(0, index * 30);
    console.log(strWidth, 50505050);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'rgba(24,144,255,.4)';
    ctx.textBaseline = 'middle';
    ctx.rotate(30 * Math.PI / 180);
    ctx.fillText(str, can.width / 3 - index * 18, 0);
    ctx.restore();
  });

  const div = document.createElement('div');
  div.id = id;
  div.classList.add('project-watermark');
  const styleTag = document.createElement('style');
  const styleContent = `
    .project-watermark{
      pointer-events: none;
      position:fixed;
      left:280px;
      top:64px;
      height:100%;
      width:calc(100% - 280px);
      background:url(${can.toDataURL('image/png')}) left top repeat;
      transition:.1s linear;
    }
    .collapsed .project-watermark {
      left:80px;
      width:calc(100% - 80px);
      transition:.1s linear;
    }
  `;
  styleTag.setAttribute('type', 'text/css');

  styleTag.innerHTML = styleContent; // 或者写成 nod.appendChild(document.createTextNode(str))
  document.getElementsByTagName('head')[0].appendChild(styleTag);
  document.body.appendChild(div);
  return id;
};

const watermark = {
  // 该方法只允许调用一次
  set: (strs: any[]): void => {
    let id = setWatermark(strs);
    setInterval(() => {
      if (document.getElementById(id) === null) {
        id = setWatermark(strs);
      }
    }, 500);
    window.onresize = () => {
      setWatermark(strs);
    };
  }
};

export default watermark;
