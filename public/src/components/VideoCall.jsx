import React, { useCallback, useState } from 'react'
import { BiPhoneCall } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

export default function VideoCall() {
    const [value, setvalue] = useState()
    const navigate = useNavigate()
    const id = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;

    const handleChange = (e) => {
        setvalue(value, id.username);
    }

    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${value}`)

    }, [navigate, value])
    return (
        <div>
            <input value={value} style={{ display: "none" }} onChange={handleChange} type="text" />
            <Button onClick={handleJoinRoom}>
                < BiPhoneCall />
            </Button>
        </div>
    )
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
