package com.forpets.be.domain.volunteerworkstatus.entity;

public enum VolunteerStatus {
    // 이동봉사 현황 상태 : 진행 중(디폴트 값), 완료
    // 약속 잡기로 이동봉사가 매칭되면 IN_PROGRESS, 이동 완료되면 DONE
    IN_PROGRESS, COMPLETED;
}
