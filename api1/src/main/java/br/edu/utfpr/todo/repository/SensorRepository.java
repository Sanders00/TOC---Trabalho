package br.edu.utfpr.todo.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.utfpr.todo.model.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, UUID> {
    
    public boolean existsByName(String name);

    public List<Sensor> findByType(String type);

    public List<Sensor> findByStatus(boolean status);

    public List<Sensor> findByLocationContaining(String location);
}
