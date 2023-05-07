import { useState, useContext, useEffect } from "react";
import { Link, useRoutes } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';

function Header() {
  const [isActiveSidebar, setActiveSidebar] = useState(false);
  const contextApp = useContext(AppContext);

  useEffect(() => {
    setActiveSidebar(false);
  }, [contextApp.loggedIn])

  function handleSignOut(e) {
    e.preventDefault();
    contextApp.handleClickSignOut();
  }

  function handleClickBurger(e) {
    setActiveSidebar(!isActiveSidebar);
  }

  const headerLink = useRoutes([
    {
      path: "/",
      element: <div className={`header__menu ${isActiveSidebar ? 'header__menu_active' : ''} `}>
        <span className="header__email">{contextApp.email}</span>
        <button className="header__btn-out" type="text" onClick={handleSignOut}>Выйти</button>
      </div>
    },
    {
      path: "/sign-up",
      element: <Link className="header__link" to="/sign-in">Войти</Link>
    },
    {
      path: "/sign-in",
      element: <Link className="header__link" to="/sign-up">Регистрация</Link>
    }
  ]);

  return (
    <header className={`header page__header ${isActiveSidebar && contextApp.loggedIn && 'header__sidebar'}`}>
      <Link className="header__logo" to={'/'}></Link>
      <button className={`header__toggle-sidebar ${contextApp.loggedIn ? 'header__toggle-sidebar_active' : ''}`} onClick={handleClickBurger}>
        <div className="header__btn">
          <span className={`header__btn-line line-top ${isActiveSidebar ? 'line-top_active' : ''}`} />
          <span className={`header__btn-line line-middle  ${isActiveSidebar ? 'line-middle_active' : ''}`} />
          <span className={`header__btn-line line-bottom  ${isActiveSidebar ? 'line-bottom_active' : ''}`} />
        </div>
      </button>
      {headerLink}
    </header>
  )
}

export default Header;