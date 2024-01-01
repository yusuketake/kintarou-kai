import "./style.css";

const bar = ({ classname }: { classname: string }) => {
  const list = [];
  for (let i = 0; i < 5 * 24; i++) {
    if (classname == "timeBar" && i % 5 == 0) {
      list.push(<div className={classname + " text"}>{i / 5 + 5}:00</div>);
    } else {
      list.push(<div className={classname}></div>);
    }
  }
  return list;
};

export default bar;
