import "./notFound.css";

const NotFound = () => {
  const clickHandler = () => {
    window.history.go(-1);
  };
  return (
    <div className="response">
      <div className="response-error">404</div>
      <div className="response-page">Страница не найдена</div>
      <div className="response-back" onClick={clickHandler}>
        Назад
      </div>
    </div>
  );
};

export default NotFound;
