package com.forpets.be.domain.chat.chatroom.entity;

public enum RoomState {
    // 채팅방 상태 : 시작 전, 진행 중, 완료
    // 시작 전은 약속잡기 이전에 채팅만 진행하는 상태, 진행 중은 약속잡기를 통해 매칭이 진행 중인 상태
    BEFORE_START, IN_PROGRESS, DONE;

    // 디폴트 값을 시작 전으로 설정
    public static RoomState getDefault() {
        return BEFORE_START;
    }
}
