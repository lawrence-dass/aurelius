'use client';

import {useEffect, useRef, useState} from 'react'
import {cn, configureAssistant,} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from '@/constants/sound.json'
import {addToSessionHistory} from "@/lib/actions/mentor.actions";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface MentorCompontentProps {
    mentorId: string;
    practice: string;
    name: string;
    userName: string | null;
    userImage: string | null;
    style: string;
    voice: string;
}

interface Message {
    role: "user" | "system" | "assistant";
    content: string;
    type?: string;
    transcriptType?: string;
    transcript?: string;
}

const MentorCompontent = ({ mentorId, practice, name, userName, userImage, style, voice }: MentorCompontentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if(lottieRef) {
            if(isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(mentorId)
        }

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript ?? "" }
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { practice, name, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error - assistantOverrides is not defined in the VAPI SDK
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className="flex flex-col">
            <section className="flex flex-col gap-4 justify-center items-center">
                <div className="mentor-section">
                    <div className="mentor-avatar bg-gray-100">
                        <div
                            className={
                            cn(
                                'absolute transition-opacity duration-1000', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                            )
                        }>
                        </div>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100': 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="mentor-lottie"
                                style={{ width: 180, height: 180 }}
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">{name}</p>
                </div>

                <div className="flex gap-4 justify-center items-center w-70">
                    <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE
                        ? "End Session"
                        : callStatus === CallStatus.CONNECTING
                            ? 'Connecting'
                        : 'Start Session'
                        }
                    </button>
                    <button className="flex flex-col items-center py-8 max-sm:py-2 cursor-pointer w-full" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="mic" width={24} height={24} />
                        <p className="max-sm:hidden text-xs">
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </p>
                    </button>
                </div>
                <div className="flex flex-col gap-4 justify-center items-center">
                        <Image src={userImage} alt={userName} width={50} height={50} className="rounded-lg" />
                        <p className="font-bold text-2xl">
                            {userName}
                        </p>
                    </div>
            </section>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if(message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {(name ? name.split(' ')[0].replace(/[.,]/g, '') : 'Assistant')}: {message.content}
                                </p>
                            )
                        } else {
                           return <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>

                <div className="transcript-fade" />
            </section>
        </section>
    )
}

export default MentorCompontent