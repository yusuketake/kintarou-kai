import "./style.css";

function Totalbar() {
  return (
    <div className="bg-red-100">
      <div>
        <div>月間</div>
      </div>
      <div>
        <div>
          <div>
            <div>実績</div>
          </div>
          <div>
            <meter value="0.5"></meter>
          </div>
        </div>
        <div>
          <div>予測</div>
          <meter value="0.8"></meter>
        </div>
      </div>
    </div>
  );
}

export default Totalbar;

// meter http://honttoni.blog74.fc2.com/blog-entry-163.html
