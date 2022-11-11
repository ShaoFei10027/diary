interface CdSkillsType {
  乱洒青荷: number;
  水月无间: number;
  芙蓉并蒂: number;
  兰摧玉折: number;
  玉石俱焚: number;
}
type CdSkillType =
  | '乱洒青荷'
  | '水月无间'
  | '芙蓉并蒂'
  | '兰摧玉折'
  | '玉石俱焚';
type SkillType = '乱洒青荷' | '阳明指' | '商阳指' | '水月无间';
type DotType = 'shangyangzhi' | 'lancuiyuzhe' | 'zhonglingyuxiu';
type BusanDotType =
  | 'is_busan_shangyangzhi'
  | 'is_busan_lancuiyuzhe'
  | 'is_busan_zhonglingyuxiu';
type BuffTimeType =
  | DotType
  | 'luansabufftime'
  | 'shuiyuebufftime'
  | 'liulibufftime'
  | 'busanbufftime';

export interface StatusType {
  lancuiyuzhe: number;
  shangyangzhi: number;
  zhonglingyuxiu: number;

  busanbufftime: number;
  shuiyuebufftime: number;
  luansabufftime: number;
  liulibufftime: number;

  time: number;
  moyi: number;
  tiaoxirest: number;
  yungong: number;
  xuezhongxingbuff: number;
}

export default class Player {
  time = 0; // 当前时间
  gcd = 150; // 公共cd
  tiaoxirest = 0; // 当前调息
  yungong = 0; // 当前运功
  yungongcallback = () => {};
  skills: SkillType[] = ['水月无间', '乱洒青荷', '阳明指', '商阳指']; // 宏

  moyi = 0;
  yangmingzhi = 0;
  busan_yangmingzhi = 0;
  shangyangzhiattact = 0;
  busan_shangyangzhiattact = 0;

  shangyangzhi = 0;
  tunshishangyangzhi = 0; // 吞噬商阳指跳数
  tunshi_busan_shangyangzhi = 0;
  is_busan_shangyangzhi = false;
  hastunshangyangzhi = false;

  lancuiyuzhe = 0;
  tunshilancuiyuzhe = 0;
  tunshi_busan_lancuiyuzhe = 0;
  is_busan_lancuiyuzhe = false;
  hastunlancuiyuzhe = false;

  zhonglingyuxiu = 0;
  tunshizhonglingyuxiu = 0;
  tunshi_busan_zhonglingyuxiu = 0;
  is_busan_zhonglingyuxiu = false;
  hastunzhonglingyuxiu = false;

  furong = 0;
  busan_furong = 0;
  furongbuff = false;

  yushijufen = 0;
  kuaixueshiqing = 0;
  kuaixueshiqingbuff = 0;
  xuezhongxingbuff = 0;

  luansabufftime = 0;
  shuiyuebufftime = 0;
  liulibufftime = 0;
  busanbufftime = 0;

  cd: CdSkillsType = {
    乱洒青荷: 0,
    水月无间: 0,
    芙蓉并蒂: 0,
    兰摧玉折: 0,
    玉石俱焚: 0,
  };

  kuaixue = {
    pt: 0,
    busan: 0,
    xuezhongxing: 0,
    busan_xuezhongxing: 0,
  };

  cdTimer = (name: CdSkillType, time: number) => {
    this.cd[name] = time * 100;
  };

  buffTimer = (name: BuffTimeType, time: number) => {
    this[name] = time * 100;
  };

  dot = (name: DotType) => {
    if (this[name]) {
      this[name] -= 1;
      // if (this[name] % 300 === 0 && this[name] < 2000) {
      //   if (this[`is_busan_${name}`]) {
      //     this[`tunshi_busan_${name}`] += 1;
      //   } else {
      //     this[`tunshi${name}`] += 1;
      //   }
      // }
    }
  };

  run = () => {
    // 计算经过t时间的伤害
    console.log('==========run');
    this.time += 1;
    this.dot('shangyangzhi');
    this.dot('lancuiyuzhe');
    this.dot('zhonglingyuxiu');
    if (this.shuiyuebufftime) {
      this.shuiyuebufftime -= 1;
    }
    if (this.busanbufftime) {
      this.busanbufftime -= 1;
    }
    if (this.liulibufftime) {
      this.liulibufftime -= 1;
    }
    if (this.luansabufftime) {
      this.luansabufftime -= 1;
    }
    Object.keys(this.cd).forEach((item) => {
      if (this.cd[item as CdSkillType]) {
        this.cd[item as CdSkillType] -= 1;
      }
    });

    if (this.yungong > 0) {
      this.yungong -= 1;
    } else {
      this.yungong = 0;
      if (this.yungongcallback) {
        this.yungongcallback();
      }
    }
    if (this.tiaoxirest > 0) {
      this.tiaoxirest -= 1;
    }
    if (!(this.yungong > 0 || this.tiaoxirest > 0)) {
      const skill = this.skills.shift();
      if (skill) {
        this[skill]();
      }
    }
  };

  getStatus: () => StatusType = () => ({
    time: this.time,
    lancuiyuzhe: this.lancuiyuzhe,
    shangyangzhi: this.shangyangzhi,
    zhonglingyuxiu: this.zhonglingyuxiu,
    busanbufftime: this.busanbufftime,
    shuiyuebufftime: this.shuiyuebufftime,
    luansabufftime: this.luansabufftime,
    liulibufftime: this.liulibufftime,
    moyi: this.moyi,
    tiaoxirest: this.tiaoxirest,
    yungong: this.yungong,
    xuezhongxingbuff: this.xuezhongxingbuff,
  });

  乱洒青荷 = () => {
    if (this.cd['乱洒青荷']) {
      console.log('乱洒青荷招式冷却中');
      return;
    }
    this.moyi += 5;
    this.cdTimer('乱洒青荷', 75);
    this.buffTimer('luansabufftime', 10);
  };

  水月无间 = () => {
    if (this.cd['水月无间']) {
      console.log('水月无间招式冷却中');
      return;
    }
    this.moyi += 20;
    this.cdTimer('水月无间', 60);
    this.buffTimer('shuiyuebufftime', 10);
    this.buffTimer('busanbufftime', 10);
  };

  // 吞噬 = (name: string) => {
  //   if (this[name] > 0) {
  //     if (this[`is_busan_${name}`]) {
  //       this[`tunshi_busan_${name}`] += Math.ceil(this[name] / 3);
  //     } else {
  //       this[`tunshi${name}`] += Math.ceil(this[name] / 3);
  //     }
  //     this[`hastun${name}`] = true;
  //   }
  // };

  阳明指 = (shangyangzhi?: boolean, lancui?: boolean, zhonglin?: boolean) => {
    if (this.moyi > 19) {
      // 顺发, 先有效果后加时间
      this.moyi -= 20;
      this.moyi += 5;
      this.xuezhongxingbuff += 1;
      this.liulibufftime = 0;
      if (this.busanbufftime) {
        this.busan_yangmingzhi += 1;
      } else {
        this.yangmingzhi += 1;
      }
      if (this.luansabufftime) {
        this.luansabufftime = 0;
        this.补毒('zhonglingyuxiu', true);
        this.补毒('lancuiyuzhe', true);
      }
      // 吞噬
      // if (shangyangzhi && this.shangyangzhi) {
      //   this.吞噬('shangyangzhi');
      // } else if (lancui && this.lancuiyuzhe) {
      //   this.吞噬('lancuiyuzhe');
      // } else if (zhonglin && this.zhonglingyuxiu) {
      //   this.吞噬('zhonglingyuxiu');
      // }

      this.tiaoxirest = this.gcd;
    } else {
      // 运功，先加时间后有效果
      this.yungong = this.gcd;
      this.yungongcallback = () => {
        this.yangmingzhi += 1;
        this.moyi += 5;
        if (this.busanbufftime) {
          this.busan_yangmingzhi += 1;
        } else {
          this.yangmingzhi += 1;
        }
        if (this.luansabufftime) {
          this.luansabufftime = 0;
          this.补毒('zhonglingyuxiu', true);
          this.补毒('lancuiyuzhe', true);
        }
      };
    }
  };

  补毒 = (name: BuffTimeType, isluansa?: boolean) => {
    if (this[name]) {
      const rest = this[name] % 300;
      this[name] = 1800 + rest;
    } else if (isluansa) {
      this[name] = 1800;
    } else {
      this[name] = 2100;
    }
    if (this.busanbufftime) {
      this[`is_busan_${name}` as BusanDotType] = true;
    } else {
      this[`is_busan_${name}` as BusanDotType] = false;
    }
  };

  芙蓉并蒂 = () => {
    if (this.cd['芙蓉并蒂']) {
      console.log('芙蓉并蒂招式冷却中');
      return;
    }
    this.moyi += 5;
    this.furongbuff = true;
    this.cdTimer('芙蓉并蒂', 25);
    if (this.busanbufftime) {
      this.busan_furong += 1;
    } else {
      this.furong += 1;
    }
    if (this.shangyangzhi) {
      this.补毒('shangyangzhi');
    }
    if (this.lancuiyuzhe) {
      this.补毒('lancuiyuzhe');
    }
    if (this.zhonglingyuxiu) {
      this.补毒('zhonglingyuxiu');
    }
    this.tiaoxirest += this.gcd;
  };

  商阳指 = () => {
    this.moyi += 5;
    if (this.busanbufftime) {
      this.busan_shangyangzhiattact += 1;
      this.is_busan_shangyangzhi = true;
    } else {
      this.shangyangzhiattact += 1;
      this.is_busan_shangyangzhi = false;
    }
    this.补毒('shangyangzhi');
    this.tiaoxirest = this.gcd;
  };

  兰摧玉折 = () => {
    if (this.cd['兰摧玉折']) {
      console.log('兰摧玉折招式冷却中');
      return;
    }
    if ((this.shuiyuebufftime || this.liulibufftime) && this.moyi > 19) {
      this.liulibufftime = 0;
      this.moyi -= 20;
      this.moyi += 5;
      this.补毒('lancuiyuzhe');
      this.tiaoxirest = this.gcd;
      this.cdTimer('兰摧玉折', 5);
    } else {
      this.yungong = this.gcd;
      this.yungongcallback = () => {
        this.moyi += 5;
        this.补毒('lancuiyuzhe');
        this.cdTimer('兰摧玉折', 5);
      };
    }
  };

  钟灵毓秀 = () => {
    if ((this.shuiyuebufftime || this.liulibufftime) && this.moyi > 19) {
      this.liulibufftime = 0;
      this.moyi -= 20;
      this.moyi += 5;
      this.补毒('zhonglingyuxiu');
    } else {
      this.yungong = this.gcd;
      this.yungongcallback = () => {
        this.moyi += 5;
        this.补毒('zhonglingyuxiu');
      };
    }
  };

  快雪时晴1 = () => {};
  快雪时晴2 = () => {};
  快雪时晴3 = () => {};
  快雪时晴4 = () => {};
  快雪时晴5 = () => {};
}

/**
 *              芙蓉 玉石俱焚 商阳指攻击 商阳指持续 兰摧玉折 钟林  快雪buff 快雪一次伤害
 *        普通  5049  4511    4468       4065      5544   4839   6477     8473
 *        布散  6033  5384    5345       4858      6630   5786   7744     10130
 *     雪中行1                                                            13435
 *     雪中行2
 *布散+雪中行1
 *布散+雪中行2
 */
