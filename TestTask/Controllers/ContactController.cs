using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTask.Models;

namespace TestTask.Controllers
{
    public class ContactController : Controller
    {
        ApplicationContext _dataBase;

        public ContactController(ApplicationContext applicationContext)
        { 
            _dataBase = applicationContext;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var allContacts = await _dataBase.Contacts.ToListAsync();
            return View(allContacts);
        }

        public ActionResult Create()
        { 
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Contact contact)
        {
            _dataBase.Contacts.Add(contact);
            await _dataBase.SaveChangesAsync();
            return RedirectToAction(nameof (Index));
        }

        [HttpPost]
        public ActionResult Edit(Contact contact)
        {
            _dataBase.Update(contact);
            _dataBase.SaveChanges();
            return RedirectToAction(nameof (Index));
        }

        public async Task<ActionResult> Edit(int id)
        {
            var contact = await _dataBase.Contacts.FirstOrDefaultAsync(c => c.Id == id);
            if (contact == null) return NotFound();
            return PartialView(contact);
        }

        public async Task<ActionResult> Delete(int id)
        {
            var contact = await _dataBase.Contacts.FirstOrDefaultAsync(c => c.Id == id);
            if (contact == null) return NotFound();
            _dataBase.Contacts.Remove(contact);
            _dataBase.SaveChanges();
            return RedirectToAction(nameof (Index));
        }
    }
}
