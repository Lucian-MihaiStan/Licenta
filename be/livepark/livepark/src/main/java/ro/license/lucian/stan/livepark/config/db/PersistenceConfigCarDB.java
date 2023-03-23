package ro.license.lucian.stan.livepark.config.db;

import org.springframework.beans.factory.annotation.Autowired;
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
        entityManagerFactoryRef = "carEntityManager",
        transactionManagerRef = "carTransactionManager",
        basePackages = {
                "ro.license.lucian.stan.livepark.repository.car",
                "ro.license.lucian.stan.livepark.entities.car"
        }
)
public class PersistenceConfigCarDB {

    private final Environment env;

    public PersistenceConfigCarDB(Environment env) {
        this.env = env;
    }

    @Bean(name = "carEntityManager")
    @Primary
    public LocalContainerEntityManagerFactoryBean carEntityManager() {
        LocalContainerEntityManagerFactoryBean em
                = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(carDataSource());
        em.setPackagesToScan(
                "ro.license.lucian.stan.livepark.repository.car",
                "ro.license.lucian.stan.livepark.entities.car"
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
    @Bean(name = "spring.seconddatasource")
    public DataSource carDataSource() {

        DriverManagerDataSource dataSource
                = new DriverManagerDataSource();
        dataSource.setDriverClassName(
                Objects.requireNonNull(env.getProperty("spring.seconddatasource.driver-class-name")));
        dataSource.setUrl(env.getProperty("spring.seconddatasource.url"));
        dataSource.setUsername(env.getProperty("spring.seconddatasource.username"));
        dataSource.setPassword(env.getProperty("spring.seconddatasource.password"));

        return dataSource;
    }

    @Primary
    @Bean(name = "carTransactionManager")
    public PlatformTransactionManager userTransactionManager() {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
                carEntityManager().getObject());
        return transactionManager;
    }

}
