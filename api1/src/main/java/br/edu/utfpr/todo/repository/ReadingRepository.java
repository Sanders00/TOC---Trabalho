package br.edu.utfpr.todo.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.utfpr.todo.model.Reading;

public interface ReadingRepository extends JpaRepository<Reading, UUID> {
    
    public List<Reading> findBySensorId(UUID sensorId);

    public List<Reading> findByDateTimeBetween(LocalDateTime startDate, LocalDateTime endDate);

    public List<Reading> findByValueGreaterThan(double value);

    public List<Reading> findByValueLessThan(double value);
}
