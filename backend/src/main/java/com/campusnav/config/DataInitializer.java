package com.campusnav.config;

import com.campusnav.repository.LocationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    private final LocationRepository locationRepository;
    private final DataSource dataSource;

    public DataInitializer(LocationRepository locationRepository, DataSource dataSource) {
        this.locationRepository = locationRepository;
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        if (locationRepository.count() == 0) {
            logger.info("Locations table is empty. Executing data.sql to seed CUTM campus locations...");
            try {
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator(false, false, "UTF-8", new ClassPathResource("data.sql"));
                populator.execute(dataSource);
                logger.info("Successfully seeded {} locations from data.sql", locationRepository.count());
            } catch (Exception e) {
                logger.error("Failed to seed data.sql", e);
            }
        } else {
            logger.info("Locations table already contains {} locations.", locationRepository.count());
        }
    }
}
