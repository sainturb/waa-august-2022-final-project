package miu.edu.alumni;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.config.CustomAuditAware;
import miu.edu.alumni.service.KeycloakService;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;

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
				Response response = keycloakService.create(user);
				if (response.getStatus() == 201) {
					List<Object> url = response.getHeaders().get("Location");
					String urlText = (String) url.get(0);
					String userId = Arrays.asList(urlText.split("/")).get(urlText.split("/").length - 1);
					RoleRepresentation roleRepresentation = keycloakService.findRoleByName(user.getType());
					keycloakService.assignRole(userId, roleRepresentation);
					keycloakService.setRequiredAction(userId, "TERMS_AND_CONDITIONS");
				}
			});
		};
	}
}

