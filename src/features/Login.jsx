import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import prevBtn from '../shared/icons/arrow_back_ios.svg';
import visibiltyBtn from '../shared/icons/visibility.svg';

export default function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [errmsg, setErrmsg] = useState(false);
    const [visBtnClick, setVisBtnClick] = useState(false);
    const toggleVisBtn = () => {setVisBtnClick(prev=>!prev)};
    const [pwInputFocus, setPwInputFocus] = useState(false);
    const pwInputRef = useRef();
    const [user, setUser] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {"loginId": id, "password":pw};
        const apiUrl = 'https://dev.snorose.com';
        const endpoint = '/v1/users/login';
        const headers = {
            'Content-Type': 'application/json'
        }
        try{
            const response = await axios.post(
                apiUrl+endpoint,
                user,
                {headers: headers}
            )
            setUser(response.data);
            setErrmsg(false);
            localStorage.setItem('user', response.data);
            console.log(response.data);
        }catch (e){
            setErrmsg(true);
            console.log(e);
        }
    }

    return (
        <div className={styles.loginframe}>
            <form onSubmit={handleSubmit}>
                <div className={styles.prev}>
                    <img src={prevBtn} alt="뒤로가기"/>
                </div>
                <div className={styles.loginbody}>
                    <p className={styles.title}>SNOROSE</p>
                    <p>숙명인의 회원 커뮤니티</p> 
                    <p>스노로즈에 오신 것을 환영합니다</p>
                    <input 
                        type="text" 
                        placeholder="아이디" 
                        onChange={((e)=>{setId(e.target.value);})} 
                        className={styles.idInput}
                    />
                    <div tabIndex="0" onFocus={()=>setPwInputFocus(true)} onBlur={()=>{setPwInputFocus(false); setVisBtnClick(false);}} className={styles.pwWrapper}>
                        <input 
                            type={visBtnClick?"text":"password"}
                            placeholder="영어, 숫자, 특수문자를 포함한 비밀번호" 
                            onChange={((e)=>{setPw(e.target.value);})} 
                            className={styles.pwInput}
                            ref={pwInputRef}
                        />
                        <div className={styles.pwEyes} onMouseDown={(e)=>{
                            e.preventDefault();
                            toggleVisBtn();
                            pwInputRef.current.focus();
                            }} onMouseUp={(event) => {
                                //이거 없으면 pwInput input의 type이 바뀔때 커서가 자꾸 앞으로 재조정됨
                                event.preventDefault();
                              }}>
                            {pwInputFocus?
                                <img src={visibiltyBtn} className={styles.visibility}></img>:""}
                        </div>
                        
                    </div>
                    <button className={styles.button} type="submit">로그인</button>
                    <div className={styles.find}><a>아이디 찾기</a> | <a>비밀번호 찾기</a></div>
                    <a className={styles.signup}>회원가입</a>
                </div>
                {errmsg ? <div className={styles.loginError}>
                    <p>아이디 혹은 비밀번호가</p>
                    <p>일치하지 않습니다</p>
                </div>:"" }
                
            </form>
        </div>
    );
}

