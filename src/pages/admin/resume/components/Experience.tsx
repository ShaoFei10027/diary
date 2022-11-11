import styles from './experience.less';

interface IProps {
  time: string;
  addr: string;
  children?: React.ReactNode;
  job?: string;
}

export default function Experience(props: IProps) {
  const { time, addr, job } = props;
  return (
    <div style={{ margin: '8px 0' }}>
      <div className={styles.title}>
        <ul>
          <li>{time}</li>
          <li>{addr}</li>
          {job && <li>{job}</li>}
        </ul>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
