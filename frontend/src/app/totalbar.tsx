import "./style.css";

function Totalbar() {
  return (
    <div className="bg-red-100">
      <div>
        <h2>月間</h2>
      </div>
      <div>
        <div>
          <div>
            <h3>実績</h3>
          </div>
          <div>
            <meter value="0.5"></meter>
          </div>
        </div>
        <div>
          <h3>予測</h3>
          <meter value="0.8"></meter>
        </div>
      </div>
    </div>
  );
}

export default Totalbar;

// meter http://honttoni.blog74.fc2.com/blog-entry-163.html
