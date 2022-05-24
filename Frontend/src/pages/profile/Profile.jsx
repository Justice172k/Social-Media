import React from 'react';
import Topbar from "../../components/topbar/Topbar";
import RightBar from "../../components/rightbar/RightBar";
import SlideBar from "../../components/slidebar/SlideBar";
import Feed from "../../components/feed/Feed";
import "./Profile.scss"

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <Topbar />
            <div className="profile">
                <SlideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={`${PF}post/3.jpeg`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={`${PF}person/7.jpeg`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Safak Kocaoglu</h4>
                            <span className="profileInfoDesc">Hello my friends!</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <RightBar profile />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
