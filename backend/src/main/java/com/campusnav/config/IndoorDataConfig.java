package com.campusnav.config;

import com.campusnav.repository.BeaconRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

@Configuration
public class IndoorDataConfig {

    @Bean
    public CommandLineRunner loadIndoorData(BeaconRepository beaconRepository, DataSource dataSource) {
        return args -> {
            if (beaconRepository.count() == 0) {
                ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator(true, true, "UTF-8", new ClassPathResource("data-indoor.sql"));
                resourceDatabasePopulator.execute(dataSource);
                System.out.println("Indoor navigation seed data loaded. Beacons count: " + beaconRepository.count());
            } else {
                System.out.println("Indoor navigation seed data already exists. Beacons count: " + beaconRepository.count());
            }
        };
    }
}
