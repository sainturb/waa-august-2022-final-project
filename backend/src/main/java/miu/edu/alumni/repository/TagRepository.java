package miu.edu.alumni.repository;

import miu.edu.alumni.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
