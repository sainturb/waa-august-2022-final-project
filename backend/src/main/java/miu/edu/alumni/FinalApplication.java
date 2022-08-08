package miu.edu.alumni;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.config.CustomAuditAware;
import miu.edu.alumni.service.KeycloakService;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static miu.edu.alumni.config.Constants.DEFAULT_USERS;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@RequiredArgsConstructor
public class FinalApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalApplication.class, args);
	}

	@Bean
	public AuditorAware<String> auditorAware(){
		return new CustomAuditAware();
	}
	@Bean
	InitializingBean saveData(KeycloakService keycloakService) {
		return () -> {
			DEFAULT_USERS.forEach(user -> {
				keycloakService.create(user);
				RoleRepresentation roleRepresentation = keycloakService.findRoleByName(user.getUsername());
				UserRepresentation userRepresentation = keycloakService.findByUsername(user.getUsername()).get(0);
				keycloakService.assignRole(userRepresentation.getId(), roleRepresentation);

				keycloakService.findAll().forEach(createdUser -> {
					keycloakService.setRequiredAction(createdUser.getId(), "TERMS_AND_CONDITIONS");
				});
			});
		};
	}
}

