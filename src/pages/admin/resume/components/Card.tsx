interface IProps {
  title: string;
  children?: React.ReactNode;
}
const titleStyle = {
  background: '#ececec44',
  borderLeft: '12px solid rgba(0,65,255,0.5)',
  paddingLeft: '8px',
  height: '28px',
  lineHeight: '28px',
};

const contentStyle = {
  padding: '8px 20px',
};

export default function Card(props: IProps) {
  const { title } = props;
  return (
    <div>
      <div style={titleStyle}>{title}</div>
      {props.children && <div style={contentStyle}>{props.children}</div>}
    </div>
  );
}
