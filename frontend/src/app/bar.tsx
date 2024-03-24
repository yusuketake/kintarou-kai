import './style.css';

const bar = ({ classname }: { classname: string }) => {
    const list = [];
    for (let i = 0; i < 5 * 24; i += 1) {
        if (classname === 'timeBar' && i % 5 === 0) {
            list.push(
                <div key={i.toString()} className={`${classname} text`}>
                    {i / 5 + 5}
                    :00
                </div>,
            );
        } else {
            list.push(<div key={i.toString()} className={classname} />);
        }
    }
    return list;
};

export default bar;
