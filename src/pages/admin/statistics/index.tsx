import { useEffect, useState } from 'react';
import Player, { StatusType } from './player';

let timer = 0;

export default function Statistics() {
  const [status, setStatus] = useState<StatusType>();
  useEffect(() => {
    const player = new Player();
    setStatus(player.getStatus());
    function startRun() {
      timer += 1;
      if (timer > 300) return;
      setTimeout(() => {
        startRun();
      }, 10);
      player.run();
      setStatus(player.getStatus());
    }
    startRun();
  }, []);
  return status ? (
    <div>
      <div>time: {status.time / 100}</div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 'none', width: '300px' }}>
          <ul>
            <li>兰摧玉折：{status.lancuiyuzhe / 100}</li>
            <li>商阳指：{status.shangyangzhi / 100}</li>
            <li>钟灵毓秀：{status.zhonglingyuxiu / 100}</li>
          </ul>
        </div>
        <div style={{ flex: 'none', width: '300px' }}>
          <ul>
            <li>墨意：{status.moyi}</li>
            <li>乱洒青荷：{status.luansabufftime / 100}</li>
            <li>水月无间：{status.shuiyuebufftime / 100}</li>
            <li>布散：{status.busanbufftime / 100}</li>
            <li>流离：{status.liulibufftime / 100}</li>
            <li>运功：{status.yungong / 100}</li>
            <li>调息：{status.tiaoxirest / 100}</li>
            <li>雪中行：{status.xuezhongxingbuff}</li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
}
