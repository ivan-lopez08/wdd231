const spotlightContainer = document.querySelector('.spotlights-container');
const membersUrl = 'data/members.json';

async function getSpotlights() {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error('Could not fetch members');
    const data = await response.json();

    const eligibleMembers = data.companies.filter(m => m['membership-lvl'] >= 2);

    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0,3);

    selected.forEach(member => {
        const card = document.createElement('article');
        card.classList.add('spotlight-card');

        const img = document.createElement('img');
        img.src = member.image;
        img.alt = member.name + ' logo';
        img.loading = 'lazy';

        const name = document.createElement('h3');
        name.textContent = member.name;

        const badge = document.createElement('span');
        badge.classList.add('membership-badge');

        switch (member["membership-lvl"]) {
            case 2:
                badge.textContent = "Silver Member";
                badge.classList.add('silver');
                break;
            case 3:
                badge.textContent = "Gold Member";
                badge.classList.add('gold');
                break;
        }

        const list = document.createElement('ul');
        member.addresses.forEach(addr => {
            const li = document.createElement('li');
            li.textContent = addr;
            list.appendChild(li);
        });

        const phone = document.createElement('p');
        phone.textContent = member['phone-number'];

        const website = document.createElement('a');
        website.href = member.website;
        website.textContent = 'Visit Website';
        website.target = '_blank';

        card.append(img, name,badge , list, phone, website);
        spotlightContainer.appendChild(card);
    });
}

getSpotlights();
