package br.edu.utfpr.todo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.edu.utfpr.todo.model.Sensor;
import br.edu.utfpr.todo.repository.SensorRepository;
import jakarta.transaction.Transactional;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    public Page<Sensor> findAll(Pageable pageable) {
        return sensorRepository.findAll(pageable);
    }

    @Transactional
    public Sensor save(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public Optional<Sensor> findById(UUID id) {
        return sensorRepository.findById(id);
    }

    public boolean existsByName(String name) {
        return sensorRepository.existsByName(name);
    }

    public List<Sensor> findByType(String type) {
        return sensorRepository.findByType(type);
    }

    public List<Sensor> findByStatus(boolean status) {
        return sensorRepository.findByStatus(status);
    }

    @Transactional
    public void delete(Sensor sensor) {
        sensorRepository.delete(sensor);
    }
}
