package miu.edu.alumni;

import miu.edu.alumni.config.CustomAuditAware;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class FinalApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalApplication.class, args);
	}

	@Bean
	public AuditorAware<String> auditorAware(){
		return new CustomAuditAware();
	}

	@Bean
	public ModelMapper getModelMapper() { return new ModelMapper(); }
}
