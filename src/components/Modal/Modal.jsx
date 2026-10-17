import { Component } from "react"
import s from "./Modal.module.css"


export class Modal extends Component {
    state = {
        username: "",
        email: "",
        password: ""
    }

    onChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value })
    }

    onSubmitBtn = () => {
        const stringifiedUserInfo = JSON.stringify({ ...this.state });
        localStorage.setItem("userInfo", stringifiedUserInfo)
        this.props.usernameBtn()
        this.props.setIsModalOpen(false);
    }
    
    
    

    render() {        
        const {username, email, password} = this.state
        return (
          <div data-close="backdrop" onClick={this.props.closeModal} className={s.backdrop}>
            <div className={s.modal}>
              <h3 className={s.modalTitle}>Sign up</h3>
              <form className={s.form}>
                <label className={s.label}>
                  Username
                  <input
                    onChange={this.onChange}
                    value={username}
                    className={s.input}
                    type="text"
                    placeholder="Username"
                    minLength={2}
                    name="username"
                  />
                </label>
                <label className={s.label}>
                  E-Mail
                  <input
                    onChange={this.onChange}
                    value={email}
                    className={s.input}
                    type="email"
                    placeholder="E-Mail"
                    minLength={2}
                    name="email"
                  />
                </label>
                <label className={s.label}>
                  Password
                  <input
                    onChange={this.onChange}
                    value={password}
                    className={s.input}
                    type="password"
                    placeholder="Password"
                    minLength={5}
                    name="password"
                  />
                </label>
              </form>
              <button onClick={this.onSubmitBtn} className={s.modalSignUpBtn}>
                Sign up
              </button>
              <p className={s.logInText}>
                Already have an account? 
                 <a href="#" className={s.logInLink}>
                  Log In
                </a>
              </p>
            </div>
          </div>
        );
    }
}