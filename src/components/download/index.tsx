import { Button } from 'antd';

interface IProps {
  name: string;
  url: string;
}

export default function Download(props: IProps) {
  const { name, url } = props;
  const onClick = () => {
    const iframe = document.createElement('iframe');
    iframe.name = 'iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    window.open(url, 'iframe');
  };
  return (
    <Button onClick={onClick} type="link">
      {name}
    </Button>
  );
}
