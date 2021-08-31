import React, { Component } from 'react';
const { Kakao } = window;


class KakaoLogin extends Component {

    state = {
      isLogin: false,
    };

    loginWithKakao = () => {
      console.log("====== loginWithKakao ======");
        try {
            return new Promise((resolve, reject) => {
              if (!Kakao) {
                reject('인스턴스 없음');
              }
              Kakao.Auth.login({
                success: res => {
                  console.log("succ : " , res);
                  localStorage.setItem('access_token', res.access_token);
                  localStorage.setItem('refresh_token', res.refresh_token);
                  this.setState({
                    isLogin: true,
                  });
                //   this.props.history.push('/signup');
                },
                fail: err => {
                  console.error("err : ", err);
                },
              });
            });
          } catch (err) {
            console.error("exception : ", err);
          }
    }

    getUserInfo = () => {
      console.log("====== getUserInfo ======");

      try {
        return new Promise((resolve, reject) => {
          if (!Kakao) {
            reject('인스턴스 없음');
          }
          Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
              console.log("succ : " , res);
              // localStorage.setItem('access_token', res.access_token);
              // localStorage.setItem('refresh_token', res.refresh_token);
              // this.setState({
              //   isLogin: true,
              // });
            //   this.props.history.push('/signup');
            },
            fail: err => {
              console.error("err : ", err);
            },
          });
        });
      } catch (err) {
        console.error("exception : ", err);
      }
    }

    loginWithBackend = () => {
      // authorizae 하고
      // 뭐..더해보자 callback까지
      // 그리고 접속시.. jwt 토큰을 발급받으면 될까?
    }

    render() {
        
        const loginView = <button onClick={this.loginWithKakao}>로그인</button>;
        return (
            <div className="App">
              {loginView}
              <button onClick={this.getUserInfo}>사용자정보</button>;
              <button onClick={this.loginWithBackend}>백엔드로그인</button>

            </div>
        );
    }
}


export default KakaoLogin;