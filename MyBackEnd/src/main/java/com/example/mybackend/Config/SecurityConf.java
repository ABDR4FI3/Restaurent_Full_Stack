/*package com.example.mybackend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConf {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(registry->{
            registry.requestMatchers("/food/**").permitAll();
            registry.requestMatchers("/user/**").permitAll();
            registry.requestMatchers("/cart/**").permitAll();
            registry.requestMatchers("/cart/**").permitAll();
            registry.requestMatchers("/cart/all").permitAll();
            registry.requestMatchers("/cart/add").permitAll();
            registry.requestMatchers("/cart/clear").permitAll();
            registry.requestMatchers("/cart/remove").permitAll();
            registry.anyRequest().authenticated();
        }).build();
    }
}*/
