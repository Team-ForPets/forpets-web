package com.forpets.be.global.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forpets.be.global.response.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException authException) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        log.error("401");
        log.trace(Arrays.toString(authException.getStackTrace()));
        ApiResponse<Void> errorResponse = ApiResponse.error("인증이 필요합니다.", "UNAUTHORIZED");
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
