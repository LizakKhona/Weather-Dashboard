import { useEffect, useState } from "react";
import { Container } from "../Container/Container"
import s from "./Header.module.css"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Modal } from "../Modal/Modal";



export const Header = () => {
  const [toShowHorizontalIcon, setToShowHorizontalIcon] = useState(true);
  const [isMenuNavOpen, setIsMenuNavOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)

  
  const [username, setUsername] = useState();
    

    const onMenuNavClick = () => {
      setToShowHorizontalIcon(toShowHorizontalIcon => !toShowHorizontalIcon)
      setIsMenuNavOpen(isMenuNavOpen => !isMenuNavOpen)
  }
  
  const closeModal = (event) => {    
    if (event.target.dataset.close === "backdrop") {
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true)
  }  
  
  const usernameBtn = () => {
    if (localStorage.getItem("userInfo")) {
      const userInfo = localStorage.getItem("userInfo")
    const parsedUserInfo = JSON.parse(userInfo)
    const username = parsedUserInfo.username
    setUsername(username);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const userInfo = localStorage.getItem("userInfo");
      const parsedUserInfo = JSON.parse(userInfo);
      const username = parsedUserInfo.username;
      setUsername(username);
    }
  }, [])
  

  

  return (
    <div className={s.thumb}>
      <header className={s.header}>
        <Container>
          <div className={s.container}>
            <div className={s.holder}>
              <div className={s.logo}></div>
              <nav className={s.navigation}>
                <ul className={s.subPagesList}>
                  <li>
                    <a className={s.link} href="#">
                      Who we are
                    </a>
                  </li>
                  <li>
                    <a className={s.link} href="#">
                      Contacts
                    </a>
                  </li>
                  <li>
                    <a className={s.link} href="#">
                      Menu
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={s.box}>
              {username ? (
                <p className={s.usernameBlock}>{username}</p>
              ) : (
                <button onClick={openModal} className={s.signUpBtn}>
                  {username ?? "Sign Up"}
                </button>
              )}
              <div className={s.profilePicture}></div>
            </div>

            <div className={s.navMenuText} onClick={onMenuNavClick}>
              <span className={s.menu}>Menu</span>
              {toShowHorizontalIcon ? (
                <IoIosArrowDown color={"black"} />
              ) : (
                <IoIosArrowForward color={"black"} />
              )}
            </div>
          </div>
        </Container>
      </header>
      <div
        className={isMenuNavOpen ? `${s.navMenuBox}` : `${s.navMenuBoxHidden}`}
      >
        <Container>
          <div className={s.cont}>
            <nav>
              <ul className={s.navMenuList}>
                <li>
                  <a className={s.menuLink} href="#">
                    Who we are
                  </a>
                </li>
                <li>
                  <a className={s.menuLink} href="#">
                    Contacts
                  </a>
                </li>
                <li>
                  <a className={s.menuLink} href="#">
                    Menu
                  </a>
                </li>
              </ul>
            </nav>
            <div className={s.menuBox}>
              <button onClick={openModal} className={s.menuSignUpBtn}>
                {username ?? "Sign Up"}
              </button>
              <div className={s.profilePictureMenu}></div>
            </div>
          </div>
        </Container>
      </div>

      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          usernameBtn={usernameBtn}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}