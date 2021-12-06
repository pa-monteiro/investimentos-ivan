import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

container.registerSingleton<IMailProvider>(
    "EtherealMailProvider",
    EtherealMailProvider
)