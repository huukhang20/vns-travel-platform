using BLL.DTOs;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;
        public ServiceController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateService([FromBody] ServiceDto serviceDto)
        {
            if (serviceDto == null)
            {
                return BadRequest("Service data is null");
            }
            try
            {
                await _serviceManager.CreateService(serviceDto);
                return Ok("Service created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateService([FromBody] ServiceDto serviceDto)
        {
            if (serviceDto == null)
            {
                return BadRequest("Service data is null");
            }
            try
            {
                await _serviceManager.UpdateService(serviceDto);
                return Ok("Service updated successfully");
            }
            catch (KeyNotFoundException knfEx)
            {
                return NotFound(knfEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("delete/{serviceId}")]
        public async Task<IActionResult> DeleteService(Guid serviceId)
        {
            try
            {
                var result = await _serviceManager.DeleteService(serviceId);
                if (result)
                {
                    return Ok("Service deleted successfully");
                }
                else
                {
                    return NotFound("Service not found");
                }
            }
            catch (KeyNotFoundException knfEx)
            {
                return NotFound(knfEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllServices()
        {
            try
            {
                var services = await _serviceManager.GetAllServices();
                return Ok(services);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{serviceId}")]
        public async Task<IActionResult> GetServiceById(Guid serviceId)
        {
            try
            {
                var service = await _serviceManager.GetServiceById(serviceId);
                if (service == null)
                {
                    return NotFound("Service not found");
                }
                return Ok(service);
            }
            catch (KeyNotFoundException knfEx)
            {
                return NotFound(knfEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("by-location/{locationId}")]
        public async Task<IActionResult> GetServicesByLocationId(Guid locationId)
        {
            try
            {
                var services = await _serviceManager.GetServicesByLocationId(locationId);
                return Ok(services);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("by-partner/{partnerId}")]
        public async Task<IActionResult> GetServicesByPartnerId(Guid partnerId)
        {
            try
            {
                var services = await _serviceManager.GetServicesByPartnerId(partnerId);
                return Ok(services);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
