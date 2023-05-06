package ro.license.livepark.config.db;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Objects;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "globalEntityManager",
        transactionManagerRef = "globalTransactionManager",
        basePackages = {
                "ro.license.livepark.repository.car",
                "ro.license.livepark.repository.driver",
                "ro.license.livepark.repository.notification",
                "ro.license.livepark.entities.car",
                "ro.license.livepark.entities.driver",
                "ro.license.livepark.entities.notification"
        }
)
public class PersistenceConfigDB {

    private final Environment env;

    public PersistenceConfigDB(Environment env) {
        this.env = env;
    }

    @Bean(name = "globalEntityManager")
    @Primary
    public LocalContainerEntityManagerFactoryBean globalEntityManager() {
        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(globalDataSource());
        em.setPackagesToScan(
                "ro.license.livepark.repository.car",
                "ro.license.livepark.repository.driver",
                "ro.license.livepark.repository.notification",
                "ro.license.livepark.entities.car",
                "ro.license.livepark.entities.driver",
                "ro.license.livepark.entities.notification"
        );

        HibernateJpaVendorAdapter vendorAdapter
                = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto",
                env.getProperty("spring.jpa.hibernate.ddl-auto"));
        properties.put("hibernate.dialect",
                env.getProperty("spring.jpa.database-platform"));
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Primary
    @Bean(name = "spring.globaldatasource")
    public DataSource globalDataSource() {

        DriverManagerDataSource dataSource
                = new DriverManagerDataSource();
        dataSource.setDriverClassName(
                Objects.requireNonNull(env.getProperty("spring.globaldatasource.driver-class-name")));
        dataSource.setUrl(env.getProperty("spring.globaldatasource.url"));
        dataSource.setUsername(env.getProperty("spring.globaldatasource.username"));
        dataSource.setPassword(env.getProperty("spring.globaldatasource.password"));

        return dataSource;
    }

    @Primary
    @Bean(name = "globalTransactionManager")
    public PlatformTransactionManager globalTransactionManager() {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
                globalEntityManager().getObject());
        return transactionManager;
    }

}
