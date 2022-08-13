package miu.edu.alumni.repository;

import miu.edu.alumni.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long>, JpaSpecificationExecutor<Faculty> {

    Optional<Faculty> findByUserId(String userId);

    Optional<Faculty> findByEmail(String email);
}
