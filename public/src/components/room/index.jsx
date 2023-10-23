import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

export default function RoomPage() {
    const { roomId } = useParams();
    const id = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const myMeeting = async (ele) => {
        const appId = 1274026701;
        const serverSecret = "18536e6dc6265d927c008803b737d5e4";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId,
            Date.now().toString(),
            id
        );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: ele,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            showTextChat: true
        })
    }
    return (
        <div>
            <div ref={myMeeting} />
        </div>
    )
}
