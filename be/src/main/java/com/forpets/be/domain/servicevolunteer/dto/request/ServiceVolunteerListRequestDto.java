package com.forpets.be.domain.servicevolunteer.dto.request;

import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import com.forpets.be.domain.user.entity.User;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ServiceVolunteerListRequestDto {

    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private String departureArea;
    private String arrivalArea;

    public ServiceVolunteer toEntity(User user) {
        return ServiceVolunteer.builder()
            .title(this.title)
            .startDate(this.startDate)
            .endDate(this.endDate)
            .departureArea(this.departureArea)
            .arrivalArea(this.arrivalArea)
            .build();
    }
}
