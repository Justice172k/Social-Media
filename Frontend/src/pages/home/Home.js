import React from "react";
import Topbar from "../../components/topbar/Topbar";
import RightBar from "../../components/rightbar/RightBar";
import SlideBar from "../../components/slidebar/SlideBar";
import Feed from "../../components/feed/Feed";
import "./Home.scss"

export default function Home() {
    return (
        <div>
            <Topbar />
            <div className="homeContainer">
                <SlideBar />
                <Feed />
                <RightBar />
            </div>
        </div>
    )
}